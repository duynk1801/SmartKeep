import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/src/constants/theme';
import { type ThemeColors } from '@/src/constants/colors';

import type { useAppTheme } from '@/src/hooks/useAppTheme';

const POWER_BUTTON_SIZE = SCREEN_WIDTH * 0.45;

type AppTheme = ReturnType<typeof useAppTheme>['theme'];

export const createStyles = (colors: ThemeColors, theme: AppTheme) => StyleSheet.create({
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
  selectorCard: {
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  selectorLabel: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.xs,
  },
  selectorValue: {
    ...theme.typography.bodyBold,
  },
  dropdownList: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.sm,
  },
  dropdownItem: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.lg,
  },
  dropdownItemActive: {
    backgroundColor: colors.primaryGlow,
  },
  dropdownItemText: {
    ...theme.typography.body,
    color: colors.textSecondary,
  },
  dropdownItemTextActive: {
    color: colors.primary,
  },
  powerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerButtonOuter: {
    width: POWER_BUTTON_SIZE,
    height: POWER_BUTTON_SIZE,
    borderRadius: POWER_BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerButton: {
    width: POWER_BUTTON_SIZE * 0.85,
    height: POWER_BUTTON_SIZE * 0.85,
    borderRadius: (POWER_BUTTON_SIZE * 0.85) / 2,
    backgroundColor: colors.glass,
    borderWidth: 2,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryGlow,
  },
  powerStatusText: {
    ...theme.typography.h3,
    marginTop: theme.spacing.lg,
  },
  powerHintText: {
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
  },
  connectionRow: {
    flexDirection: 'row',
    gap: theme.spacing.cardGap,
    marginBottom: theme.spacing.xl,
  },
  connectionCard: {
    flex: 1,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  connectionLabel: {
    ...theme.typography.small,
    marginBottom: theme.spacing.xs,
  },
  connectionValue: {
    ...theme.typography.bodyBold,
    color: colors.primary,
  },
});

export const POWER_BUTTON_SIZE_EXPORT = POWER_BUTTON_SIZE;
