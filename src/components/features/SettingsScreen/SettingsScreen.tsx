import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Moon, Languages } from 'lucide-react-native';

import { GlassCard } from '@/src/components/common/GlassCard';
import { Toggle } from '@/src/components/common/Toggle';
import { SCREEN_WIDTH } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useSettingsStore } from '@/src/store/settingsStore';

import type { Language } from '@/src/store/settingsStore';

interface SettingsScreenProps {
  onOpenDrawer: () => void;
}

function SettingsScreenComponent({ onOpenDrawer }: SettingsScreenProps) {
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const themeMode = useSettingsStore((s) => s.themeMode);
  const language = useSettingsStore((s) => s.language);
  const toggleTheme = useSettingsStore((s) => s.toggleTheme);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{t('settings.title')}</Text>
          <Text style={styles.subtitle}>{t('settings.subtitle')}</Text>
        </View>
        <TouchableOpacity
          onPress={onOpenDrawer}
          activeOpacity={0.7}
          style={styles.hamburger}
        >
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <GlassCard style={styles.card}>
        <View style={styles.sectionHeader}>
          <Moon size={20} color={colors.primary} />
          <View style={styles.sectionText}>
            <Text style={styles.sectionTitle}>{t('settings.themeTitle')}</Text>
            <Text style={styles.sectionSubtitle}>{t('settings.themeSubtitle')}</Text>
          </View>
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.currentValue}>
            {themeMode === 'dark' ? t('common.darkMode') : t('common.lightMode')}
          </Text>
          <Toggle value={themeMode === 'dark'} onValueChange={() => toggleTheme()} />
        </View>
      </GlassCard>

      <GlassCard style={styles.card}>
        <View style={styles.sectionHeader}>
          <Languages size={20} color={colors.primary} />
          <View style={styles.sectionText}>
            <Text style={styles.sectionTitle}>{t('settings.languageTitle')}</Text>
            <Text style={styles.sectionSubtitle}>{t('settings.languageSubtitle')}</Text>
          </View>
        </View>
        <View style={styles.languageRow}>
          {(['en', 'vi'] as Language[]).map((option) => {
            const isActive = language === option;
            return (
              <TouchableOpacity
                key={option}
                onPress={() => setLanguage(option)}
                activeOpacity={0.7}
                style={[
                  styles.languageButton,
                  isActive && styles.languageButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.languageText,
                    isActive && styles.languageTextActive,
                  ]}
                >
                  {option === 'en' ? t('common.english') : t('common.vietnamese')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassCard>
    </View>
  );
}

export const SettingsScreen = React.memo(SettingsScreenComponent);

const createStyles = (
  colors: ReturnType<typeof useAppTheme>['colors'],
  theme: ReturnType<typeof useAppTheme>['theme'],
) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: theme.spacing.screenPadding,
    paddingTop: theme.spacing.xxl + theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  card: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  sectionText: {
    flex: 1,
    gap: 2,
  },
  sectionTitle: {
    ...theme.typography.h3,
  },
  sectionSubtitle: {
    ...theme.typography.caption,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentValue: {
    ...theme.typography.bodyBold,
  },
  languageRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  languageButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryGlow,
  },
  languageText: {
    ...theme.typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  languageTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
