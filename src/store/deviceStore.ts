import { create } from 'zustand';

import type { Device } from '@/src/types';

interface DeviceStoreState {
  devices: Device[];
  selectedDevice: Device | null;
  isLoading: boolean;
  error: string | null;
}

interface DeviceStoreActions {
  setDevices: (devices: Device[]) => void;
  addDevice: (device: Device) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  removeDevice: (id: string) => void;
  setSelectedDevice: (device: Device | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

type DeviceStore = DeviceStoreState & DeviceStoreActions;

export const useDeviceStore = create<DeviceStore>((set) => ({
  // --- State ---
  devices: [],
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
}));
