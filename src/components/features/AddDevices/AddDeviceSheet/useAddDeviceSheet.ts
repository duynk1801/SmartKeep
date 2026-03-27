import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { ProductType, InventoryEntryType, InventoryStatus, ConnectionType } from '@/src/constants/enums';
import { useDeviceStore } from '@/src/store/deviceStore';
import { useInventoryStore } from '@/src/store/inventoryStore';

import type { Product } from '@/src/types';
import type { InventoryDevice, InventoryGroup } from '@/src/components/features/GroupDetail';

export interface AddDeviceSheetProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (groupId: string) => void;
  targetGroupId?: string;
  editingDevice?: InventoryDevice | null;
}

type SelectionStep = 'selection' | 'details';
type DeviceType = ProductType | null;

export const useAddDeviceSheet = ({ visible, onClose, onSuccess, targetGroupId, editingDevice }: AddDeviceSheetProps) => {
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bottom Sheet Configuration
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  useEffect(() => {
    if (visible) {
      if (editingDevice) {
        setStep('details');
        setSelectedType(editingDevice.product_type || ProductType.SMART_DEVICE);
        setGroupName(editingDevice.location || '');
        setName(editingDevice.name || '');
        setCategoryId(['AC', 'Fan', 'TV'].includes(editingDevice.category) ? editingDevice.category : '');
        setSerialNumber(editingDevice.serial || '');
        setAddWarranty(!!editingDevice.warrantyExpiry);
        setPurchaseDate(editingDevice.warrantyExpiry || new Date().toISOString().split('T')[0]);
        setWarrantyMonths('12');
      } else {
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
      }
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible, editingDevice]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  const targetGroup = useMemo(() => {
    return targetGroupId 
      ? useInventoryStore.getState().entries.find(e => e.id === targetGroupId && e.type === InventoryEntryType.GROUP) as InventoryGroup | undefined
      : undefined;
  }, [targetGroupId, visible]);

  const handleSelectType = (type: DeviceType) => {
    setSelectedType(type);
    if (targetGroup) {
      setGroupName(targetGroup.name);
    } else {
      setGroupName(type === ProductType.SMART_DEVICE ? 'My Smart Devices' : 'My Hardware Devices');
    }
    
    // Auto-compute sequential index for default prefix
    const totalDevices = useInventoryStore.getState().entries.reduce((acc, entry) => {
      return acc + (entry.type === 'group' ? entry.items.length : 1);
    }, 0);
    setName(`Device ${totalDevices + 1}`);
    
    setStep('details');
  };

  const handleSave = async () => {
    if ((!editingDevice && !groupName.trim()) || !name.trim()) {
      Alert.alert('Validation Error', 'Please enter required fields.');
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (editingDevice && targetGroupId) {
        const updatedItem: Partial<InventoryDevice> = {
          name,
          category: categoryId || (selectedType === ProductType.HARDWARE ? 'Hardware' : 'Smart Component'),
          serial: serialNumber || editingDevice.serial,
          warrantyExpiry: addWarranty && purchaseDate ? purchaseDate : undefined,
          product_type: selectedType!,
        };
        useInventoryStore.getState().updateDeviceInGroup(targetGroupId, editingDevice.id, updatedItem);
        onSuccess(targetGroupId);
        onClose();
        return;
      }

      const timestamp = Date.now();
      const parentId = targetGroupId || `group-${timestamp}`;
      
      // 1. Create the Device Store Product
      if (!targetGroupId) {
        const groupProduct: Product = {
          id: parentId,
          name: groupName,
          is_group: true,
          product_type: selectedType!,
          category: 'Group',
        };
        
        useDeviceStore.getState().addDevice(groupProduct);
      }

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

      const newInventoryItem: InventoryDevice = {
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
      };

      const inventoryStore = useInventoryStore.getState();

      if (targetGroupId) {
        if (targetGroup) {
          inventoryStore.updateGroup(targetGroupId, {
            items: [...targetGroup.items, newInventoryItem]
          });
        }
      } else {
        // 4. Save to Inventory Store so it appears in MyComputer/Remote
        const rootGroup: InventoryGroup = {
          id: parentId,
          type: InventoryEntryType.GROUP,
          name: groupName,
          summary: `Custom setup with 1 components`,
          status: InventoryStatus.ACTIVE,
          items: [newInventoryItem],
          product_type: selectedType!,
        };
        inventoryStore.addGroup(rootGroup);
      }

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

  return {
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
    targetGroupId,
    handleSelectType,
    handleSave,
    categoryOptions,
    monthsOptions,
    snapPoints,
    handleSheetChanges,
  };
};
