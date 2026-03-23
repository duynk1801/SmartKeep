import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '@/src/constants/colors';
import { DEVICE_TYPE_LABELS } from '@/src/constants/deviceTypes';
import type { Device } from '@/src/types/database';

interface DeviceCardProps {
  device: Device;
  onPress: (device: Device) => void;
}

function DeviceCardComponent({ device, onPress }: DeviceCardProps) {
  const handlePress = React.useCallback(() => {
    onPress(device);
  }, [device, onPress]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>
          {device.name}
        </Text>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: device.is_online ? Colors.success : Colors.textSecondary },
          ]}
        />
      </View>

      <Text style={styles.type}>
        {DEVICE_TYPE_LABELS[device.device_type] ?? device.device_type}
      </Text>

      <Text style={styles.connection}>
        {device.connection_type === 'bluetooth' ? '📶 Bluetooth' : '🌐 WiFi'}
      </Text>
    </View>
  );
}

export const DeviceCard = React.memo(DeviceCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  type: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  connection: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
