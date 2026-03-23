import BleManager from 'react-native-ble-manager';

import { BLE_CONNECTION_TIMEOUT_MS } from '@/src/constants/configs';

/**
 * BluetoothManager — Higher-level BLE operations.
 *
 * Manages pairing, service discovery, and characteristic read/write.
 * Designed to be replaceable with an Expo Module for advanced native BLE features.
 */

interface BleCharacteristic {
  serviceUUID: string;
  characteristicUUID: string;
}

export const BluetoothManager = {
  async initialize(): Promise<void> {
    await BleManager.start({ showAlert: false });
  },

  async pairDevice(deviceId: string): Promise<boolean> {
    try {
      await BleManager.connect(deviceId);

      // Wait for bonding (Android-specific)
      await BleManager.createBond(deviceId);

      return true;
    } catch (err) {
      console.error(`[BLE] Pairing failed for ${deviceId}:`, err);
      return false;
    }
  },

  async discoverServices(deviceId: string): Promise<string[]> {
    try {
      const peripheralInfo = await BleManager.retrieveServices(deviceId);
      return peripheralInfo.services?.map((s) => s.toString()) ?? [];
    } catch (err) {
      console.error(`[BLE] Service discovery failed:`, err);
      return [];
    }
  },

  async readCharacteristic(
    deviceId: string,
    { serviceUUID, characteristicUUID }: BleCharacteristic,
  ): Promise<number[]> {
    const data = await BleManager.read(deviceId, serviceUUID, characteristicUUID);
    return data;
  },

  async writeCharacteristic(
    deviceId: string,
    { serviceUUID, characteristicUUID }: BleCharacteristic,
    value: number[],
  ): Promise<void> {
    await BleManager.write(deviceId, serviceUUID, characteristicUUID, value);
  },

  async disconnect(deviceId: string): Promise<void> {
    await BleManager.disconnect(deviceId);
  },

  async isDeviceConnected(deviceId: string): Promise<boolean> {
    const connected = await BleManager.isPeripheralConnected(deviceId, []);
    return connected;
  },
} as const;
