import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  Menu,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Cpu,
  Wifi,
  Bluetooth,
  Boxes,
  Edit2,
  Check,
  Trash2,
  Plus,
} from 'lucide-react-native';

import { useInventoryStore } from '@/src/store';

import { GlassCard } from '@/src/components/common/GlassCard';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useGroupDetail } from './useGroupDetail';
import { createStyles } from './GroupDetail.styles';

import type { InventoryDevice } from './GroupDetail.types';

interface GroupDetailProps {
  groupId: string;
  onOpenDrawer: () => void;
}

function GroupDetailComponent({ groupId, onOpenDrawer }: GroupDetailProps) {
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);
  
  const {
    group,
    expandedDeviceIds,
    handleToggleDeviceDetails,
  } = useGroupDetail(groupId);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  const { updateGroup, removeGroup, removeDeviceFromGroup } = useInventoryStore();

  useEffect(() => {
    if (group?.name) {
      setEditName(group.name);
    }
  }, [group?.name]);

  const handleSaveEdit = () => {
    if (editName.trim()) {
      updateGroup(groupId, { name: editName });
    }
    setIsEditing(false);
  };

  const handleDeleteGroup = () => {
    Alert.alert('Delete Group', 'Are you sure you want to delete this group and all its devices?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeGroup(groupId) }
    ]);
  };

  const handleDeleteDevice = (deviceId: string) => {
    Alert.alert('Delete Device', 'Are you sure you want to remove this device?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeDeviceFromGroup(groupId, deviceId) }
    ]);
  };

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

  const renderDeviceCard = useCallback((device: InventoryDevice) => {
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
        <View style={styles.entryCard}>
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
              {isEditing && (
                <TouchableOpacity onPress={() => handleDeleteDevice(device.id)} style={styles.deleteItemBtn}>
                  <Trash2 size={18} color={colors.error} />
                </TouchableOpacity>
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
  }, [colors.textSecondary, colors.error, isEditing, expandedDeviceIds, handleToggleDeviceDetails, renderDeviceDetails, renderWarrantyBadge, styles, t]);

  if (!group) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Group Not Found</Text>
          </View>
          <TouchableOpacity onPress={onOpenDrawer} activeOpacity={0.7} style={styles.hamburger}>
            <Menu size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Dynamic Header based on Group */}
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={editName}
              onChangeText={setEditName}
              autoFocus
            />
          ) : (
            <Text style={styles.title}>{group.name}</Text>
          )}
          <Text style={styles.subtitle}>{group.summary}</Text>
        </View>
        <View style={styles.headerRightRow}>
          {isEditing ? (
            <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.7} style={styles.headerIconBtn}>
              <Check size={20} color={colors.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)} activeOpacity={0.7} style={styles.headerIconBtn}>
              <Edit2 size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onOpenDrawer}
            activeOpacity={0.7}
            style={styles.hamburger}
          >
            <Menu size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.statusRow}>
              <Cpu size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>{`${group.items.length} ${t('common.items')}`}</Text>
            </View>
            <Text style={styles.sectionSubtitle}>{t('computer.groupsSubtitle')}</Text>
          </View>
          
          {group.items.length > 0
            ? group.items.map((item) => renderDeviceCard(item))
            : (
              <GlassCard style={styles.entryCard}>
                <Text style={styles.emptyText}>{t('computer.noStandaloneDevices')}</Text>
              </GlassCard>
            )
          }
        </GlassCard>

        {isEditing && (
          <TouchableOpacity style={styles.addDeviceBtn} onPress={() => Alert.alert('Coming Soon', 'Add device to this specific group.')}>
            <Plus size={24} color={colors.primary} />
            <Text style={styles.addDeviceText}>Add Another Device</Text>
          </TouchableOpacity>
        )}

        {isEditing && (
          <TouchableOpacity style={styles.deleteGroupBtn} onPress={handleDeleteGroup}>
            <Trash2 size={24} color={colors.error} />
            <Text style={styles.deleteGroupText}>Delete Entire Group</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

export const GroupDetail = React.memo(GroupDetailComponent);
