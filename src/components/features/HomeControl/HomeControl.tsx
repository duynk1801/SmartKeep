import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fan, Thermometer, Menu } from 'lucide-react-native';

import { GlassCard } from '@/src/components/common/GlassCard';
import { Toggle } from '@/src/components/common/Toggle';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useHomeControl } from './useHomeControl';
import { createStyles } from './HomeControl.styles';

import type { DeviceData } from './HomeControl.types';

interface HomeControlProps {
  onOpenDrawer: () => void;
}

const DEVICE_ICONS = {
  fan: Fan,
  ac: Thermometer,
  light: Fan, // placeholder
  tv: Fan,    // placeholder
} as const;

function HomeControlComponent({ onOpenDrawer }: HomeControlProps) {
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const { devices, handleToggleDevice } = useHomeControl();
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);

  const renderDeviceCard = useCallback(
    (device: DeviceData) => {
      const DeviceIcon = DEVICE_ICONS[device.type];
      const iconColor = device.isOn ? colors.primary : colors.textSecondary;
      const statusDotStyle = device.status === 'active'
        ? styles.statusDotActive
        : device.status === 'standby'
          ? styles.statusDotStandby
          : styles.statusDotOff;
      const deviceName = device.type === 'fan'
        ? t('home.fan')
        : device.type === 'ac'
          ? t('home.airConditioner')
          : device.type === 'light'
            ? t('home.smartLight')
            : t('home.tv');

      return (
        <GlassCard key={device.id} style={styles.deviceCard}>
          <View
            style={[
              styles.deviceIconContainer,
              device.isOn && styles.deviceIconContainerActive,
            ]}
          >
            <DeviceIcon size={28} color={iconColor} />
          </View>

          <View style={styles.deviceInfo}>
            <Text style={styles.deviceName}>{deviceName}</Text>
            <Text
              style={[
                styles.deviceStatus,
                device.isOn ? styles.deviceStatusOn : styles.deviceStatusOff,
              ]}
            >
              {device.isOn ? t('common.on') : t('common.offLabel')}
            </Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, statusDotStyle]} />
              <Text style={styles.statusText}>{t(`common.${device.status}`)}</Text>
            </View>
          </View>

          <Toggle
            value={device.isOn}
            onValueChange={() => handleToggleDevice(device.id)}
          />
        </GlassCard>
      );
    },
    [colors.primary, colors.textSecondary, handleToggleDevice, styles, t],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{t('home.title')}</Text>
          <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        </View>
        <TouchableOpacity
          onPress={onOpenDrawer}
          activeOpacity={0.7}
          style={styles.hamburger}
        >
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Device Cards */}
      <View style={styles.deviceList}>
        {devices.map(renderDeviceCard)}
      </View>
    </View>
  );
}

export const HomeControl = React.memo(HomeControlComponent);
