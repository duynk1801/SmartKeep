import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '@/src/constants/theme';
import type { useAppTheme } from '@/src/hooks/useAppTheme';

export const DRAWER_WIDTH = SCREEN_WIDTH * 0.78;

export const createStyles = (
  colors: ReturnType<typeof useAppTheme>['colors'],
  theme: ReturnType<typeof useAppTheme>['theme'],
) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.overlay,
    },
    drawer: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: DRAWER_WIDTH,
      paddingHorizontal: 0,
      paddingTop: theme.spacing.xxl + theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: colors.border,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    headerTitle: {
      ...theme.typography.h2,
      paddingHorizontal: 4,
    },
    topSection: {
      flex: 1,
      minHeight: 0,
    },
    sectionHint: {
      ...theme.typography.caption,
      color: colors.textTertiary,
      paddingHorizontal: theme.spacing.lg + 4,
      marginBottom: theme.spacing.md,
    },
    dragList: {
      flex: 1,
    },
    dragContent: {
      paddingBottom: theme.spacing.md,
    },
    itemSeparator: {
      height: 2,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
    },
    menuItemPressArea: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
    },
    menuItemTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flexShrink: 1,
    },
    dragHandle: {
      marginLeft: theme.spacing.sm,
      paddingLeft: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    menuItemActive: {
      backgroundColor: colors.primaryGlow,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
      borderRadius: 0,
      paddingLeft: 17, // offset left border width
    },
    draggingItem: {
      backgroundColor: colors.drawerItem,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
      elevation: 6,
    },
    menuItemText: {
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0.5,
      color: colors.textSecondary,
      flexShrink: 1,
    },
    menuItemTextActive: {
      color: colors.primary,
    },
    bottomSection: {
      marginTop: theme.spacing.md,
      paddingTop: theme.spacing.md,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginTop: 8,
    },
    logoutText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.error,
    },
    badgeContainer: {
      minWidth: 18,
      height: 16,
      paddingHorizontal: 4,
      borderRadius: 8,
      backgroundColor: colors.drawerItem,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeContainerActive: {
      backgroundColor: colors.primaryGlowStrong,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    badgeTextActive: {
      color: colors.primary,
    },
  });
