import type { Device, Warranty } from './database';
import type { AuthState } from './auth';

/**
 * App-Level State Interfaces
 *
 * Used by Zustand stores and screen-level state management.
 */

export interface DeviceState {
  devices: Device[];
  selectedDevice: Device | null;
  isLoading: boolean;
  error: string | null;
}

export interface WarrantyState {
  warranties: Warranty[];
  isLoading: boolean;
  error: string | null;
}

export interface BluetoothDevice {
  id: string;
  name: string | null;
  rssi: number;
  isConnectable: boolean;
}

export interface WiFiNetwork {
  ssid: string;
  bssid: string;
  signalStrength: number;
  isSecured: boolean;
}

export interface ScanResult {
  type: 'barcode' | 'qr' | 'text';
  value: string;
  timestamp: number;
}

export type { AuthState };
