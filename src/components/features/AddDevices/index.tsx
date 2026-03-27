import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Boxes, CheckCircle2, Laptop, Menu } from 'lucide-react-native';

import { Button } from '@/src/components/common/Button';
import { GlassCard } from '@/src/components/common/GlassCard';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { AddDeviceSheet } from './AddDeviceSheet';

import { createStyles } from './styles';
import { useAddDevices } from './useAddDevices';

interface AddDevicesProps {
  onOpenDrawer: () => void;
  onReviewInventory: () => void;
  onNavigate: (screen: string) => void;
}

function AddDevicesComponent({ onOpenDrawer, onReviewInventory, onNavigate }: AddDevicesProps) {
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);

  const {
    message,
    isSheetOpen,
    setSheetOpen,
    handleAddSingle,
    handleSuccess,
    handleAddGroup,
  } = useAddDevices(onNavigate);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{t('addDevices.title')}</Text>
          <Text style={styles.subtitle}>{t('addDevices.subtitle')}</Text>
        </View>
        <TouchableOpacity onPress={onOpenDrawer} activeOpacity={0.7} style={styles.hamburger}>
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
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
            <Button title={t('addDevices.reviewAction')} onPress={onReviewInventory} variant='outline' />
          </GlassCard>
        ) : null}
      </ScrollView>

      <AddDeviceSheet 
        visible={isSheetOpen} 
        onClose={() => setSheetOpen(false)} 
        onSuccess={handleSuccess} 
      />
    </View>
  );
}

export const AddDevices = React.memo(AddDevicesComponent);
export { AddDeviceSheet } from './AddDeviceSheet';
