import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/src/constants/theme';
import { type ThemeColors } from '@/src/constants/colors';

import type { useAppTheme } from '@/src/hooks/useAppTheme';

const ICON_SIZE = SCREEN_WIDTH * 0.14;

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
    fontSize: 28,
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
  deviceList: {
    gap: theme.spacing.cardGap,
  },
  deviceCard: {
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: colors.primaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  deviceIconContainerActive: {
    backgroundColor: colors.primaryGlowStrong,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.xs,
  },
  deviceStatus: {
    ...theme.typography.label,
  },
  deviceStatusOn: {
    color: colors.primary,
  },
  deviceStatusOff: {
    color: colors.textTertiary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusDotActive: {
    backgroundColor: colors.statusActive,
  },
  statusDotStandby: {
    backgroundColor: colors.statusStandby,
  },
  statusDotOff: {
    backgroundColor: colors.statusOff,
  },
  statusText: {
    ...theme.typography.small,
    textTransform: 'capitalize',
  },
});
