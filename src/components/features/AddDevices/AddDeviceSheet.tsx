import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Wifi, Bluetooth, Cpu, Barcode, X, ChevronDown, Plus, Trash2 } from 'lucide-react-native';

import BottomSheet, { 
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';

import { SCREEN_HEIGHT } from '@/src/constants/theme';
import { ProductType, InventoryEntryType, InventoryStatus, ConnectionType } from '@/src/constants/enums';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { BottomSheetSelector } from '@/src/components/common/BottomSheetSelector';
import { CameraScanner } from '@/src/components/common/CameraScanner';
import { useDeviceStore } from '@/src/store/deviceStore';
import { useInventoryStore } from '@/src/store/inventoryStore';

import type { Product } from '@/src/types';
import type { InventoryDevice, InventoryGroup } from '@/src/components/features/GroupDetail';

interface AddDeviceSheetProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (groupId: string) => void;
}

type SelectionStep = 'selection' | 'details';
type DeviceType = ProductType | null;


export const AddDeviceSheet: React.FC<AddDeviceSheetProps> = ({ visible, onClose, onSuccess }) => {
  const { colors, theme } = useAppTheme();
  
  // Ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Modals & Navigation
  const [step, setStep] = useState<SelectionStep>('selection');
  
  // Data State
  const [groupName, setGroupName] = useState('');
  const [selectedType, setSelectedType] = useState<DeviceType>(null);
  
  // Form State for First Item
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [ipAddress, setIpAddress] = useState('192.168.1.1');
  const [addWarranty, setAddWarranty] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [warrantyMonths, setWarrantyMonths] = useState<string>('12');
  

  // UI States
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isMonthsModalOpen, setMonthsModalOpen] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bottom Sheet Configuration
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  useEffect(() => {
    if (visible) {
      setStep('selection');
      setSelectedType(null);
      setGroupName('');
      setName('');
      setCategoryId('');
      setIpAddress('192.168.1.1');
      setAddWarranty(false);
      setSerialNumber('');
      setPurchaseDate(new Date().toISOString().split('T')[0]);
      setWarrantyMonths('12');
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  const handleSelectType = (type: DeviceType) => {
    setSelectedType(type);
    setGroupName('My Device Group');
    setName('My Device');
    setStep('details');
  };


  const handleSave = async () => {
    if (!groupName.trim() || !name.trim()) {
      Alert.alert('Validation Error', 'Please enter both Group Name and Main Item Name.');
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const timestamp = Date.now();
      const parentId = `group-${timestamp}`;
      
      // 1. Create the Device Store Product
      const groupProduct: Product = {
        id: parentId,
        name: groupName,
        is_group: true,
        product_type: selectedType!,
        category: 'Group',
      };
      
      useDeviceStore.getState().addDevice(groupProduct);

      // 2. Prepare inventory items for the UI
      const inventoryItems: InventoryDevice[] = [];

      const firstProduct: Product = {
        id: `item-${timestamp}-first`,
        name,
        parent_id: parentId,
        is_group: false,
        product_type: selectedType!,
        ...(selectedType === ProductType.SMART_DEVICE ? { category: categoryId } : { category: 'Hardware' }),
      };

      if (selectedType === ProductType.SMART_DEVICE) {
        firstProduct.iot_configs = {
          ip_address: ipAddress,
          add_warranty_info: addWarranty,
        };
        if (addWarranty) {
          firstProduct.warranty_details = {
            serial_number: serialNumber,
            purchase_date: purchaseDate,
            warranty_months: parseInt(warrantyMonths, 10),
          };
        }
      } else {
        firstProduct.warranty_details = {
          serial_number: serialNumber,
          purchase_date: purchaseDate,
          warranty_months: parseInt(warrantyMonths, 10),
        };
      }
      useDeviceStore.getState().addDevice(firstProduct);

      inventoryItems.push({
        id: firstProduct.id,
        type: InventoryEntryType.DEVICE,
        name: firstProduct.name,
        category: firstProduct.category || (selectedType === ProductType.HARDWARE ? 'Hardware' : 'Smart Component'),
        status: InventoryStatus.ACTIVE,
        serial: serialNumber || `SN-${Math.floor(Math.random() * 10000)}`,
        location: groupName,
        connection: selectedType === ProductType.SMART_DEVICE ? ConnectionType.WIFI : ConnectionType.BLUETOOTH,
        health: '100%',
        lastChecked: new Date().toISOString().split('T')[0],
        hasWarrantyWarning: false,
        warrantyExpiry: addWarranty && purchaseDate ? purchaseDate : undefined,
        product_type: selectedType!,
      });


      // 4. Save to Inventory Store so it appears in MyComputer/Remote
      const rootGroup: InventoryGroup = {
        id: parentId,
        type: InventoryEntryType.GROUP,
        name: groupName,
        summary: `Custom setup with ${inventoryItems.length} components`,
        status: InventoryStatus.ACTIVE,
        items: inventoryItems,
        product_type: selectedType!,
      };
      useInventoryStore.getState().addGroup(rootGroup);

      onSuccess(parentId);
      onClose();
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to save group and items.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = useMemo(() => [
    { label: 'Air Conditioner', value: 'AC' },
    { label: 'Fan', value: 'Fan' },
    { label: 'Television', value: 'TV' },
  ], []);

  const monthsOptions = useMemo(() => [
    { label: '12 Months', value: '12' },
    { label: '24 Months', value: '24' },
    { label: '36 Months', value: '36' },
  ], []);


  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={visible ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.textSecondary }}
        keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'interactive'}
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
      >
        <BottomSheetScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 60, gap: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Add Definition</Text>
            <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
              <X size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {step === 'selection' ? (
            <View style={styles.selectionContainer}>
              <TouchableOpacity 
                style={[styles.card, { backgroundColor: colors.background, borderColor: colors.primary }]}
                onPress={() => handleSelectType(ProductType.SMART_DEVICE)}
              >
                <View style={styles.cardIconRow}>
                  <Wifi size={32} color={colors.primary} />
                  <View style={{ width: 8 }} />
                  <Bluetooth size={32} color={colors.primary} />
                </View>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Smart Device</Text>
                <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>Connect via WiFi or BLE</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.card, { backgroundColor: colors.background, borderColor: colors.primary }]}
                onPress={() => handleSelectType(ProductType.HARDWARE)}
              >
                <View style={styles.cardIconRow}>
                  <Cpu size={32} color={colors.primary} />
                  <View style={{ width: 8 }} />
                  <Barcode size={32} color={colors.primary} />
                </View>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Hardware Component</Text>
                <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>Manage Warranty & Specs</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Device Group Name *</Text>
                <BottomSheetTextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.glassBorder, backgroundColor: colors.backgroundSecondary }]}
                  value={groupName}
                  onChangeText={setGroupName}
                  placeholder="e.g. Living Room TV or My PC..."
                  placeholderTextColor={colors.textTertiary}
                />
              </View>

              <View style={styles.formContainer}>
                <Text style={[styles.sectionTitle, { color: colors.primary }]}>Main Item Details</Text>

                {selectedType === 'smart_device' && (
                  <>
                    <View style={styles.field}>
                      <Text style={[styles.label, { color: colors.textSecondary }]}>Main Component Name *</Text>
                      <BottomSheetTextInput
                        style={[styles.input, { color: colors.text, borderColor: colors.glassBorder }]}
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={colors.textSecondary}
                      />
                    </View>
                    <View style={styles.field}>
                      <Text style={[styles.label, { color: colors.textSecondary }]}>Category</Text>
                      <TouchableOpacity style={[styles.input, { borderColor: colors.glassBorder }]} onPress={() => setCategoryModalOpen(true)}>
                        <Text style={{ color: categoryId ? colors.text : colors.textSecondary }}>
                          {categoryId ? categoryOptions.find(o => o.value === categoryId)?.label : 'Select Category'}
                        </Text>
                        <ChevronDown size={20} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.field}>
                      <Text style={[styles.label, { color: colors.textSecondary }]}>IP Address</Text>
                      <BottomSheetTextInput
                        style={[styles.input, { color: colors.text, borderColor: colors.glassBorder }]}
                        value={ipAddress}
                        onChangeText={setIpAddress}
                        placeholderTextColor={colors.textSecondary}
                      />
                    </View>
                    <View style={styles.rowField}>
                      <Text style={[styles.label, { color: colors.textSecondary, marginBottom: 0 }]}>Add Warranty Info?</Text>
                      <Switch value={addWarranty} onValueChange={setAddWarranty} trackColor={{ true: colors.primary }} />
                    </View>
                  </>
                )}

                {(selectedType === 'hardware' || addWarranty) && (
                  <>
                    {selectedType === 'hardware' && (
                      <View style={styles.field}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>Main Component Name *</Text>
                        <BottomSheetTextInput
                          style={[styles.input, { color: colors.text, borderColor: colors.glassBorder }]}
                          value={name}
                          onChangeText={setName}
                          placeholderTextColor={colors.textSecondary}
                        />
                      </View>
                    )}
                    <View style={styles.field}>
                      <Text style={[styles.label, { color: colors.textSecondary }]}>Serial Number</Text>
                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        <BottomSheetTextInput
                          style={[styles.input, { flex: 1, color: colors.text, borderColor: colors.glassBorder }]}
                          value={serialNumber}
                          onChangeText={setSerialNumber}
                          placeholderTextColor={colors.textSecondary}
                        />
                        <TouchableOpacity 
                          style={[styles.scanButton, { backgroundColor: colors.primary + '22', borderColor: colors.primary }]}
                          onPress={() => setScannerOpen(true)}
                        >
                          <Barcode size={24} color={colors.primary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.field}>
                      <Text style={[styles.label, { color: colors.textSecondary }]}>Purchase Date</Text>
                      <BottomSheetTextInput
                        style={[styles.input, { color: colors.text, borderColor: colors.glassBorder }]}
                        value={purchaseDate}
                        onChangeText={setPurchaseDate}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={colors.textSecondary}
                      />
                    </View>
                    <View style={styles.field}>
                      <Text style={[styles.label, { color: colors.textSecondary }]}>Warranty</Text>
                      <TouchableOpacity style={[styles.input, { borderColor: colors.glassBorder }]} onPress={() => setMonthsModalOpen(true)}>
                        <Text style={{ color: warrantyMonths ? colors.text : colors.textSecondary }}>
                          {monthsOptions.find(o => o.value === warrantyMonths)?.label || 'Select Months'}
                        </Text>
                        <ChevronDown size={20} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </>
                )}

              </View>
              


              <View style={[styles.inlineFooter, { borderTopColor: colors.glassBorder }]}>
                <TouchableOpacity 
                  style={[styles.saveButton, { backgroundColor: colors.primary, opacity: isSubmitting ? 0.7 : 1 }]}
                  onPress={handleSave}
                  disabled={isSubmitting}
                >
                  <Text style={styles.saveButtonText}>{isSubmitting ? 'Saving...' : 'Add Device'}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </BottomSheetScrollView>
      </BottomSheet>

      <BottomSheetSelector
        visible={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        options={categoryOptions}
        selectedValue={categoryId}
        onSelect={setCategoryId}
        title="Select Category"
      />

      <BottomSheetSelector
        visible={isMonthsModalOpen}
        onClose={() => setMonthsModalOpen(false)}
        options={monthsOptions}
        selectedValue={warrantyMonths}
        onSelect={setWarrantyMonths}
        title="Warranty Duration"
      />

      <CameraScanner
        visible={isScannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={(data) => setSerialNumber(data)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  selectionContainer: {
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
  },
  formContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 12,
  },
  field: {
    gap: 6,
  },
  rowField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scanButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
  inlineFooter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8,
  },
  addItemInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  addItemBtn: {
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
    gap: 8,
  },
  additionalItemInput: {
    flex: 1,
    fontSize: 16,
  },
});
