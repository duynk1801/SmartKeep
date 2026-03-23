import { useState, useCallback, useRef, useEffect } from 'react';
import BleManager from 'react-native-ble-manager';

import { BLE_SCAN_TIMEOUT_MS } from '@/src/constants/configs';
import type { BluetoothDevice } from '@/src/types';

/**
 * useBluetooth — BLE scanning, connection, and device discovery.
 *
 * Wraps react-native-ble-manager with typed state management.
 */
export function useBluetooth() {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDeviceId, setConnectedDeviceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    BleManager.start({ showAlert: false }).catch(() => {
      setError('Failed to initialize Bluetooth');
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const startScan = useCallback(async () => {
    setError(null);
    setIsScanning(true);
    setDevices([]);

    try {
      await BleManager.scan([], BLE_SCAN_TIMEOUT_MS / 1000, true);

      const discovered = await BleManager.getDiscoveredPeripherals();
      if (isMounted.current) {
        setDevices(
          discovered.map((peripheral) => ({
            id: peripheral.id,
            name: peripheral.name ?? null,
            rssi: peripheral.rssi ?? -100,
            isConnectable: peripheral.advertising?.isConnectable ?? false,
          })),
        );
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'Scan failed');
      }
    } finally {
      if (isMounted.current) {
        setIsScanning(false);
      }
    }
  }, []);

  const connectToDevice = useCallback(async (deviceId: string) => {
    try {
      await BleManager.connect(deviceId);
      if (isMounted.current) {
        setConnectedDeviceId(deviceId);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'Connection failed');
      }
    }
  }, []);

  const disconnectDevice = useCallback(async () => {
    if (!connectedDeviceId) return;
    try {
      await BleManager.disconnect(connectedDeviceId);
      if (isMounted.current) {
        setConnectedDeviceId(null);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'Disconnect failed');
      }
    }
  }, [connectedDeviceId]);

  return {
    devices,
    isScanning,
    connectedDeviceId,
    error,
    startScan,
    connectToDevice,
    disconnectDevice,
  } as const;
}
