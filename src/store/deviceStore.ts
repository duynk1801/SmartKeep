import { create } from 'zustand';

import { ProductType } from '@/src/constants/enums';

import type { Device, Product } from '@/src/types';

interface DeviceStoreState {
  devices: Product[];
  selectedDevice: Product | null;
  isLoading: boolean;
  error: string | null;
}

interface DeviceStoreActions {
  setDevices: (devices: Product[]) => void;
  addDevice: (device: Product) => void;
  updateDevice: (id: string, updates: Partial<Product>) => void;
  removeDevice: (id: string) => void;
  setSelectedDevice: (device: Product | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Optimistic UI for create
  addDeviceOptimistic: (device: Product, apiCall: () => Promise<Product>) => Promise<void>;
}

type DeviceStore = DeviceStoreState & DeviceStoreActions;

const initialMockDevices: Product[] = [
  {
    id: 'mock-gaming-pc-1',
    name: 'Gaming PC',
    is_group: true,
    product_type: ProductType.HARDWARE,
  }
];

export const useDeviceStore = create<DeviceStore>((set) => ({
  // --- State ---
  devices: initialMockDevices, // Mocked "Gaming PC" group
  selectedDevice: null,
  isLoading: false,
  error: null,

  // --- Actions ---
  setDevices: (devices) =>
    set({ devices, isLoading: false }),

  addDevice: (device) =>
    set((state) => ({ devices: [device, ...state.devices] })),

  updateDevice: (id, updates) =>
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === id ? { ...d, ...updates } : d,
      ),
    })),

  removeDevice: (id) =>
    set((state) => ({
      devices: state.devices.filter((d) => d.id !== id),
      selectedDevice: state.selectedDevice?.id === id ? null : state.selectedDevice,
    })),

  setSelectedDevice: (device) =>
    set({ selectedDevice: device }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  setError: (error) =>
    set({ error }),

  addDeviceOptimistic: async (device, apiCall) => {
    // 1. Optimistic Update
    set((state) => ({ devices: [device, ...state.devices] }));
    try {
      // 2. Perform API Call
      const finalDevice = await apiCall();
      // 3. Update with real data (e.g. real ID from DB)
      set((state) => ({
        devices: state.devices.map((d) => d.id === device.id ? finalDevice : d)
      }));
    } catch (e: any) {
      // 4. Rollback
      set((state) => ({
        devices: state.devices.filter((d) => d.id !== device.id),
        error: e?.message || 'Failed to add device'
      }));
      throw e;
    }
  }
}));
