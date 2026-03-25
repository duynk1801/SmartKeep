import { create } from 'zustand';

import { MOCKUP_INVENTORY } from '@/src/data/mockup';

import type { InventoryDevice, InventoryEntry, InventoryGroup } from '@/src/components/features/GroupDetail';

interface InventoryState {
  entries: InventoryEntry[];
  addDevice: (device: InventoryDevice) => void;
  addGroup: (group: InventoryGroup) => void;
  updateGroup: (groupId: string, data: Partial<InventoryGroup>) => void;
  removeGroup: (groupId: string) => void;
  removeDeviceFromGroup: (groupId: string, deviceId: string) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  entries: MOCKUP_INVENTORY,
  addDevice: (device) =>
    set((state) => ({
      entries: [device, ...state.entries],
    })),
  addGroup: (group) =>
    set((state) => ({
      entries: [group, ...state.entries],
    })),
  updateGroup: (groupId, data) =>
    set((state) => ({
      entries: state.entries.map(e => e.id === groupId && e.type === 'group' ? { ...e, ...data } : e)
    })),
  removeGroup: (groupId) =>
    set((state) => ({
      entries: state.entries.filter(e => e.id !== groupId)
    })),
  removeDeviceFromGroup: (groupId, deviceId) =>
    set((state) => ({
      entries: state.entries.map(e => {
        if (e.id === groupId && e.type === 'group') {
          return {
            ...e,
            items: e.items.filter(item => item.id !== deviceId)
          };
        }
        return e;
      })
    })),
}));
