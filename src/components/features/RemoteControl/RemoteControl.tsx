import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Menu, Power, ChevronDown, Bluetooth, Wifi } from 'lucide-react-native';

import { GlassCard } from '@/src/components/common/GlassCard';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useRemoteControl } from './useRemoteControl';
import { createStyles } from './RemoteControl.styles';

import type { RemoteDevice } from './RemoteControl.types';

interface RemoteControlProps {
  onOpenDrawer: () => void;
}

function RemoteControlComponent({ onOpenDrawer }: RemoteControlProps) {
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const {
    devices,
    selectedDevice,
    isPoweredOn,
    dropdownOpen,
    connectionType,
    signalStrength,
    pulseAnim,
    handleTogglePower,
    handleSelectDevice,
    handleToggleDropdown,
  } = useRemoteControl();
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);

  const renderDropdownItem = useCallback(
    (device: RemoteDevice) => {
      const isActive = device.id === selectedDevice.id;
      return (
        <TouchableOpacity
          key={device.id}
          onPress={() => handleSelectDevice(device)}
          activeOpacity={0.7}
          style={[
            styles.dropdownItem,
            isActive && styles.dropdownItemActive,
          ]}
        >
          <Text
            style={[
              styles.dropdownItemText,
              isActive && styles.dropdownItemTextActive,
            ]}
          >
            {device.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [handleSelectDevice, selectedDevice.id, styles],
  );

  const ConnectionIcon = connectionType === 'bluetooth' ? Bluetooth : Wifi;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{t('remote.title')}</Text>
          <Text style={styles.subtitle}>{t('remote.subtitle')}</Text>
        </View>
        <TouchableOpacity
          onPress={onOpenDrawer}
          activeOpacity={0.7}
          style={styles.hamburger}
        >
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Device Selector */}
      <TouchableOpacity onPress={handleToggleDropdown} activeOpacity={0.7}>
        <GlassCard style={styles.selectorCard}>
          <View>
            <Text style={styles.selectorLabel}>{t('remote.selectedDevice')}</Text>
            <Text style={styles.selectorValue}>{selectedDevice.name}</Text>
          </View>
          <ChevronDown
            size={20}
            color={colors.textSecondary}
            style={{ transform: [{ rotate: dropdownOpen ? '180deg' : '0deg' }] }}
          />
        </GlassCard>
      </TouchableOpacity>

      {dropdownOpen ? (
        <GlassCard style={styles.dropdownList}>
          {devices.map(renderDropdownItem)}
        </GlassCard>
      ) : null}

      {/* Power Button */}
      <View style={styles.powerSection}>
        <TouchableOpacity onPress={handleTogglePower} activeOpacity={0.8}>
          <Animated.View
            style={[
              styles.powerButtonOuter,
              isPoweredOn && theme.shadow.neonGlowStrong,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <View
              style={[
                styles.powerButton,
                isPoweredOn && styles.powerButtonActive,
              ]}
            >
              <Power
                size={48}
                color={isPoweredOn ? colors.primary : colors.textSecondary}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.powerStatusText}>
          {isPoweredOn ? t('remote.poweredOn') : t('remote.poweredOff')}
        </Text>
        <Text style={styles.powerHintText}>
          {`${t('remote.tapToTurn')} ${isPoweredOn ? t('common.offLabel').toLowerCase() : t('common.on').toLowerCase()}`}
        </Text>
      </View>

      {/* Connection Info */}
      <View style={styles.connectionRow}>
        <GlassCard style={styles.connectionCard}>
          <Text style={styles.connectionLabel}>{t('common.connection')}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <ConnectionIcon size={16} color={colors.primary} />
            <Text style={styles.connectionValue}>
              {connectionType === 'bluetooth' ? t('common.bluetooth') : t('common.wifi')}
            </Text>
          </View>
        </GlassCard>
        <GlassCard style={styles.connectionCard}>
          <Text style={styles.connectionLabel}>{t('remote.signalStrength')}</Text>
          <Text style={styles.connectionValue}>
            {signalStrength === 'strong'
              ? t('remote.strong')
              : signalStrength === 'medium'
                ? t('remote.medium')
                : t('remote.weak')}
          </Text>
        </GlassCard>
      </View>
    </View>
  );
}

export const RemoteControl = React.memo(RemoteControlComponent);
