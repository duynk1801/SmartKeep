import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Laptop, Boxes, CheckCircle2 } from 'lucide-react-native';

import { GlassCard } from '@/src/components/common/GlassCard';
import { Button } from '@/src/components/common/Button';
import { SCREEN_WIDTH } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useInventoryStore } from '@/src/store';

import type { InventoryDevice, InventoryGroup } from '@/src/components/features/MyComputer/MyComputer.types';

interface AddDevicesProps {
  onOpenDrawer: () => void;
  onReviewInventory: () => void;
}

function AddDevicesComponent({ onOpenDrawer, onReviewInventory }: AddDevicesProps) {
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const addDevice = useInventoryStore((s) => s.addDevice);
  const addGroup = useInventoryStore((s) => s.addGroup);
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddSingle = () => {
    const device: InventoryDevice = {
      id: `device-${Date.now()}`,
      type: 'device',
      name: 'Laptop Pro',
      category: 'Laptop',
      status: 'active',
      serial: `LTP-${Date.now().toString().slice(-6)}`,
      location: 'New device shelf',
      connection: 'wifi',
      health: '100%',
      lastChecked: '2026-03-19 10:00',
      hasWarrantyWarning: false,
    };

    addDevice(device);
    setMessage(t('addDevices.addedSingle'));
  };

  const handleAddGroup = () => {
    const seed = Date.now();
    const group: InventoryGroup = {
      id: `group-${seed}`,
      type: 'group',
      name: 'My Computer',
      summary: t('computer.addGroupDescription'),
      status: 'active',
      items: [
        {
          id: `group-${seed}-gpu`,
          type: 'device',
          name: 'RTX 4070',
          category: 'VGA',
          status: 'active',
          serial: `GPU-${seed.toString().slice(-6)}`,
          location: 'PC case',
          connection: 'wifi',
          health: '97%',
          lastChecked: '2026-03-19 10:05',
          hasWarrantyWarning: false,
        },
        {
          id: `group-${seed}-cpu`,
          type: 'device',
          name: 'Ryzen 9',
          category: 'CPU',
          status: 'active',
          serial: `CPU-${seed.toString().slice(-6)}`,
          location: 'Mainboard',
          connection: 'wifi',
          health: '96%',
          lastChecked: '2026-03-19 10:05',
          hasWarrantyWarning: false,
        },
        {
          id: `group-${seed}-ssd`,
          type: 'device',
          name: 'SSD 1TB',
          category: 'Storage',
          status: 'standby',
          serial: `SSD-${seed.toString().slice(-6)}`,
          location: 'M.2 slot',
          connection: 'bluetooth',
          health: '91%',
          lastChecked: '2026-03-19 10:05',
          hasWarrantyWarning: true,
          warrantyExpiry: '2026-05-01',
        },
      ],
    };

    addGroup(group);
    setMessage(t('addDevices.addedGroup'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{t('addDevices.title')}</Text>
          <Text style={styles.subtitle}>{t('addDevices.subtitle')}</Text>
        </View>
        <TouchableOpacity
          onPress={onOpenDrawer}
          activeOpacity={0.7}
          style={styles.hamburger}
        >
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <GlassCard style={styles.optionCard}>
          <View style={styles.optionHeader}>
            <Laptop size={22} color={colors.primary} />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{t('addDevices.singleTitle')}</Text>
              <Text style={styles.optionSubtitle}>{t('addDevices.singleSubtitle')}</Text>
            </View>
          </View>
          <Text style={styles.optionHint}>{t('addDevices.singleHint')}</Text>
          <Button title={t('addDevices.singleAction')} onPress={handleAddSingle} />
        </GlassCard>

        <GlassCard style={styles.optionCard}>
          <View style={styles.optionHeader}>
            <Boxes size={22} color={colors.primary} />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{t('addDevices.groupTitle')}</Text>
              <Text style={styles.optionSubtitle}>{t('addDevices.groupSubtitle')}</Text>
            </View>
          </View>
          <Text style={styles.optionHint}>{t('addDevices.groupHint')}</Text>
          <Button title={t('addDevices.groupAction')} onPress={handleAddGroup} />
        </GlassCard>

        {message ? (
          <GlassCard style={styles.feedbackCard}>
            <View style={styles.feedbackHeader}>
              <CheckCircle2 size={18} color={colors.success} />
              <Text style={styles.feedbackTitle}>{t('addDevices.addedTitle')}</Text>
            </View>
            <Text style={styles.feedbackText}>{message}</Text>
            <Button
              title={t('addDevices.reviewAction')}
              onPress={onReviewInventory}
              variant="outline"
            />
          </GlassCard>
        ) : null}
      </View>
    </View>
  );
}

export const AddDevices = React.memo(AddDevicesComponent);

const createStyles = (
  colors: ReturnType<typeof useAppTheme>['colors'],
  theme: ReturnType<typeof useAppTheme>['theme'],
) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: theme.spacing.screenPadding,
    paddingTop: theme.spacing.xxl + theme.spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  headerText: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
  },
  subtitle: {
    ...theme.typography.subtitle,
    marginTop: theme.spacing.xs,
  },
  hamburger: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    borderRadius: theme.radius.lg,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: theme.spacing.lg,
  },
  optionCard: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  optionHeader: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
  },
  optionText: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    ...theme.typography.h3,
  },
  optionSubtitle: {
    ...theme.typography.caption,
  },
  optionHint: {
    ...theme.typography.body,
    color: colors.textSecondary,
  },
  feedbackCard: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  feedbackTitle: {
    ...theme.typography.bodyBold,
  },
  feedbackText: {
    ...theme.typography.body,
    color: colors.textSecondary,
  },
});
