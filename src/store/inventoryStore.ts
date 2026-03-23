import { create } from 'zustand';

import { MOCKUP_INVENTORY } from '@/src/data/mockup';

import type { InventoryDevice, InventoryEntry, InventoryGroup } from '@/src/components/features/MyComputer/MyComputer.types';

interface InventoryState {
  entries: InventoryEntry[];
  addDevice: (device: InventoryDevice) => void;
  addGroup: (group: InventoryGroup) => void;
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
}));
