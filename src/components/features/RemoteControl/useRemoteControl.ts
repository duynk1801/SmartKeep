import { useState, useCallback, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import { MOCKUP_REMOTE_DEVICES } from '@/src/data/mockup';

import type { RemoteDevice, ConnectionType, SignalStrength } from './RemoteControl.types';

export function useRemoteControl() {
  const [selectedDevice, setSelectedDevice] = useState<RemoteDevice>(MOCKUP_REMOTE_DEVICES[0]);
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [connectionType] = useState<ConnectionType>('bluetooth');
  const [signalStrength] = useState<SignalStrength>('strong');

  // Glow pulse animation
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isPoweredOn) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isPoweredOn, pulseAnim]);

  const handleTogglePower = useCallback(() => {
    setIsPoweredOn((prev) => !prev);
  }, []);

  const handleSelectDevice = useCallback((device: RemoteDevice) => {
    setSelectedDevice(device);
    setDropdownOpen(false);
  }, []);

  const handleToggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  return {
    devices: MOCKUP_REMOTE_DEVICES,
    selectedDevice,
    isPoweredOn,
    dropdownOpen,
    connectionType,
    signalStrength,
    pulseAnim,
    handleTogglePower,
    handleSelectDevice,
    handleToggleDropdown,
  } as const;
}
