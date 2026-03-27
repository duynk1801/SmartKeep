import { useState } from 'react';

import { ProductType, InventoryEntryType, InventoryStatus, ConnectionType } from '@/src/constants/enums';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useInventoryStore } from '@/src/store/inventoryStore';

import type { InventoryGroup } from '@/src/components/features/GroupDetail';

export const useAddDevices = (onNavigate: (screen: string) => void) => {
  const { t } = useTranslation();
  const addGroup = useInventoryStore((s) => s.addGroup);
  const [message, setMessage] = useState<string | null>(null);
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleAddSingle = () => {
    setSheetOpen(true);
  };

  const handleSuccess = (groupId: string) => {
    setMessage(t('addDevices.addedSingle') || 'Device added successfully!');
    onNavigate(groupId);
  };

  const handleAddGroup = () => {
    const seed = Date.now();
    const group: InventoryGroup = {
      id: `group-${seed}`,
      type: InventoryEntryType.GROUP,
      name: 'My Computer',
      summary: t('computer.addGroupDescription'),
      status: InventoryStatus.ACTIVE,
      product_type: ProductType.HARDWARE,
      items: [
        {
          id: `group-${seed}-gpu`,
          type: InventoryEntryType.DEVICE,
          name: 'RTX 4070',
          category: 'VGA',
          status: InventoryStatus.ACTIVE,
          serial: `GPU-${seed.toString().slice(-6)}`,
          location: 'PC case',
          connection: ConnectionType.WIFI,
          health: '97%',
          lastChecked: '2026-03-19 10:05',
          hasWarrantyWarning: false,
          product_type: ProductType.HARDWARE,
        },
        {
          id: `group-${seed}-cpu`,
          type: InventoryEntryType.DEVICE,
          name: 'Ryzen 9',
          category: 'CPU',
          status: InventoryStatus.ACTIVE,
          serial: `CPU-${seed.toString().slice(-6)}`,
          location: 'Mainboard',
          connection: ConnectionType.WIFI,
          health: '96%',
          lastChecked: '2026-03-19 10:05',
          hasWarrantyWarning: false,
          product_type: ProductType.HARDWARE,
        },
        {
          id: `group-${seed}-ssd`,
          type: InventoryEntryType.DEVICE,
          name: 'SSD 1TB',
          category: 'Storage',
          status: InventoryStatus.STANDBY,
          serial: `SSD-${seed.toString().slice(-6)}`,
          location: 'M.2 slot',
          connection: ConnectionType.BLUETOOTH,
          health: '91%',
          lastChecked: '2026-03-19 10:05',
          hasWarrantyWarning: true,
          warrantyExpiry: '2026-05-01',
          product_type: ProductType.HARDWARE,
        },
      ],
    };

    addGroup(group);
    setMessage(t('addDevices.addedGroup'));
    onNavigate(group.id);
  };

  return {
    message,
    isSheetOpen,
    setSheetOpen,
    handleAddSingle,
    handleSuccess,
    handleAddGroup,
  };
};
