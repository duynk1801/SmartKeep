import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Switch, Platform, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Wifi, Bluetooth, Cpu, Barcode, X, ChevronDown } from 'lucide-react-native';

import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { ProductType } from '@/src/constants/enums';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { BottomSheetSelector } from '@/src/components/common/BottomSheetSelector';
import { CameraScanner } from '@/src/components/common/CameraScanner';

import { useAddDeviceSheet, type AddDeviceSheetProps } from './useAddDeviceSheet';
import { styles } from './styles';

export const AddDeviceSheet: React.FC<AddDeviceSheetProps> = (props) => {
  const { visible, targetGroupId, editingDevice } = props;
  const { colors } = useAppTheme();
  const colorScheme = useColorScheme();
  
  const {
    bottomSheetRef,
    step,
    groupName,
    setGroupName,
    selectedType,
    name,
    setName,
    categoryId,
    setCategoryId,
    ipAddress,
    setIpAddress,
    addWarranty,
    setAddWarranty,
    serialNumber,
    setSerialNumber,
    purchaseDate,
    setPurchaseDate,
    warrantyMonths,
    setWarrantyMonths,
    isCategoryModalOpen,
    setCategoryModalOpen,
    isMonthsModalOpen,
    setMonthsModalOpen,
    isScannerOpen,
    setScannerOpen,
    showDatePicker,
    setShowDatePicker,
    isSubmitting,
    handleSelectType,
    handleSave,
    categoryOptions,
    monthsOptions,
    snapPoints,
    handleSheetChanges,
  } = useAddDeviceSheet(props);

  const renderBackdrop = useCallback(
    (bpProps: any) => (
      <BottomSheetBackdrop
        {...bpProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

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
            <Text style={[styles.title, { color: colors.text }]}>{editingDevice ? 'Update Device' : 'Add Definition'}</Text>
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
              {!targetGroupId && !editingDevice && (
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
              )}

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
                      <TouchableOpacity 
                        style={[styles.input, { borderColor: colors.glassBorder }]}
                        onPress={() => setShowDatePicker(prev => !prev)}
                      >
                        <Text style={{ color: purchaseDate ? colors.text : colors.textSecondary }}>
                          {purchaseDate || 'Select Date'}
                        </Text>
                      </TouchableOpacity>
                      
                      {showDatePicker && (
                        <View style={Platform.OS === 'ios' ? { marginTop: 8, alignItems: 'center' } : {}}>
                          <DateTimePicker
                            value={purchaseDate ? new Date(purchaseDate) : new Date()}
                            mode="date"
                            display="spinner"
                            maximumDate={new Date()}
                            themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
                            onChange={(event, selectedDate) => {
                              if (Platform.OS === 'android') {
                                setShowDatePicker(false);
                              }
                              if (selectedDate && (event.type === 'set' || Platform.OS === 'ios')) {
                                setPurchaseDate(selectedDate.toISOString().split('T')[0]);
                              }
                            }}
                          />
                        </View>
                      )}
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
                  <Text style={styles.saveButtonText}>{isSubmitting ? 'Saving...' : (editingDevice ? 'Save ' : 'Add Device')}</Text>
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
