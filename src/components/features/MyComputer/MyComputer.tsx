import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Menu,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Cpu,
  Layers3,
  MonitorSmartphone,
  Wifi,
  Bluetooth,
} from 'lucide-react-native';

import { GlassCard } from '@/src/components/common/GlassCard';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useMyComputer } from './useMyComputer';
import { createStyles } from './MyComputer.styles';

import type { InventoryDevice, InventoryEntry, InventoryGroup } from './MyComputer.types';

interface MyComputerProps {
  onOpenDrawer: () => void;
}

function MyComputerComponent({ onOpenDrawer }: MyComputerProps) {
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);
  const {
    standaloneDevices,
    groupedDevices,
    expandedEntryIds,
    expandedDeviceIds,
    handleToggleEntry,
    handleToggleDeviceDetails,
  } = useMyComputer();

  const renderWarrantyBadge = useCallback((device: InventoryDevice) => {
    if (!device.hasWarrantyWarning) return null;

    return (
      <View style={styles.warrantyBadge}>
        <AlertTriangle size={12} color={colors.warning} />
        <Text style={styles.warrantyText}>{t('common.warranty')}</Text>
      </View>
    );
  }, [colors.warning, styles, t]);

  const renderDeviceDetails = useCallback((device: InventoryDevice) => {
    const ConnectionIcon = device.connection === 'wifi' ? Wifi : Bluetooth;

    return (
      <View style={styles.detailCard}>
        <Text style={styles.detailTitle}>{t('computer.deviceDetails')}</Text>
        <View style={styles.detailGrid}>
          <Text style={styles.detailText}>{`${t('common.serial')}: ${device.serial}`}</Text>
          <Text style={styles.detailText}>{`${t('common.location')}: ${device.location}`}</Text>
          <Text style={styles.detailText}>{`${t('computer.health')}: ${device.health}`}</Text>
          <Text style={styles.detailText}>{`${t('computer.lastChecked')}: ${device.lastChecked}`}</Text>
          <View style={styles.statusRow}>
            <ConnectionIcon size={14} color={colors.primary} />
            <Text style={styles.detailText}>
              {`${t('common.connection')}: ${device.connection === 'wifi' ? t('common.wifi') : t('common.bluetooth')}`}
            </Text>
          </View>
          {device.warrantyExpiry ? (
            <Text style={styles.detailText}>{`${t('common.expires')}: ${device.warrantyExpiry}`}</Text>
          ) : null}
        </View>
      </View>
    );
  }, [colors.primary, styles, t]);

  const renderDeviceCard = useCallback((device: InventoryDevice, nested = false) => {
    const isExpanded = !!expandedDeviceIds[device.id];
      const statusDotStyle =
        device.status === 'active'
          ? styles.statusDotActive
          : device.status === 'standby'
            ? styles.statusDotStandby
            : styles.statusDotOff;

      return (
        <TouchableOpacity
          key={device.id}
          onPress={() => handleToggleDeviceDetails(device.id)}
          activeOpacity={0.8}
        >
          <View style={nested ? styles.childCard : styles.entryCard}>
            <View style={styles.childHeader}>
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{device.name}</Text>
                <Text style={styles.entryMeta}>{device.category}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 8 }}>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, statusDotStyle]} />
                  <Text style={styles.statusText}>{t(`common.${device.status}`)}</Text>
                </View>
                {isExpanded ? (
                  <ChevronUp size={18} color={colors.textSecondary} />
                ) : (
                  <ChevronDown size={18} color={colors.textSecondary} />
                )}
              </View>
            </View>
            {renderWarrantyBadge(device)}
            {isExpanded ? (
              renderDeviceDetails(device)
            ) : null}
          </View>
        </TouchableOpacity>
      );
    }, [colors.textSecondary, expandedDeviceIds, handleToggleDeviceDetails, renderDeviceDetails, renderWarrantyBadge, styles, t]);

  const renderGroupCard = useCallback((group: InventoryGroup) => {
    const isExpanded = !!expandedEntryIds[group.id];
    const statusDotStyle =
      group.status === 'active'
        ? styles.statusDotActive
        : group.status === 'standby'
          ? styles.statusDotStandby
          : styles.statusDotOff;

    return (
      <GlassCard key={group.id} style={styles.entryCard}>
        <TouchableOpacity
          onPress={() => handleToggleEntry(group.id)}
          activeOpacity={0.8}
        >
          <View style={styles.entryHeader}>
            <View style={styles.entryTitleWrap}>
              <Text style={styles.entryName}>{group.name}</Text>
              <Text style={styles.entryMeta}>{`${group.items.length} ${t('common.items')}`}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 8 }}>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, statusDotStyle]} />
                <Text style={styles.statusText}>{t(`common.${group.status}`)}</Text>
              </View>
              {isExpanded ? (
                <ChevronUp size={20} color={colors.textSecondary} />
              ) : (
                <ChevronDown size={20} color={colors.textSecondary} />
              )}
            </View>
          </View>

          <Text style={styles.groupSummary}>{group.summary}</Text>
          <Text style={styles.hintText}>
            {isExpanded ? t('computer.tapToCollapse') : t('computer.tapToExpand')}
          </Text>
        </TouchableOpacity>

        {isExpanded ? (
          <View style={styles.detailCard}>
            <View style={styles.statusRow}>
              <Layers3 size={16} color={colors.primary} />
              <Text style={styles.detailTitle}>{t('computer.groupDetails')}</Text>
            </View>
            <Text style={styles.detailText}>{group.summary}</Text>
            <Text style={styles.detailText}>{`${t('computer.componentList')}: ${group.items.length} ${t('common.devices')}`}</Text>
            <View style={styles.itemList}>
              {group.items.map((item) => renderDeviceCard(item, true))}
            </View>
          </View>
        ) : null}
      </GlassCard>
    );
  }, [colors.primary, colors.textSecondary, expandedEntryIds, handleToggleEntry, renderDeviceCard, styles, t]);

  const renderStandaloneCard = useCallback((entry: InventoryEntry) => {
    if (entry.type !== 'device') return null;

    return (
      <GlassCard key={entry.id}>
        {renderDeviceCard(entry)}
      </GlassCard>
    );
  }, [renderDeviceCard]);

  const renderEmptyState = useCallback((text: string) => (
    <GlassCard style={styles.entryCard}>
      <Text style={styles.emptyText}>{text}</Text>
    </GlassCard>
  ), [styles]);

  const renderSectionHeader = useCallback((title: string, subtitle: string, Icon: typeof Cpu) => (
    <View style={styles.sectionHeader}>
      <View style={styles.statusRow}>
        <Icon size={16} color={colors.primary} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  ), [colors.primary, styles]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{t('computer.title')}</Text>
          <Text style={styles.subtitle}>{t('computer.subtitle')}</Text>
        </View>
        <TouchableOpacity
          onPress={onOpenDrawer}
          activeOpacity={0.7}
          style={styles.hamburger}
        >
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <GlassCard style={styles.sectionCard}>
          {renderSectionHeader(
            t('computer.standaloneTitle'),
            t('computer.standaloneSubtitle'),
            MonitorSmartphone,
          )}
          {standaloneDevices.length > 0
            ? standaloneDevices.map((device) => renderStandaloneCard(device))
            : renderEmptyState(t('computer.noStandaloneDevices'))}
        </GlassCard>

        <GlassCard style={styles.sectionCard}>
          {renderSectionHeader(
            t('computer.groupsTitle'),
            t('computer.groupsSubtitle'),
            Layers3,
          )}
          {groupedDevices.length > 0
            ? groupedDevices.map((entry) => entry.type === 'group' ? renderGroupCard(entry) : null)
            : renderEmptyState(t('computer.noGroups'))}
        </GlassCard>
      </ScrollView>
    </View>
  );
}

export const MyComputer = React.memo(MyComputerComponent);
