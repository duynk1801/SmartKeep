import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/src/constants/theme';
import { type ThemeColors } from '@/src/constants/colors';

import type { useAppTheme } from '@/src/hooks/useAppTheme';

type AppTheme = ReturnType<typeof useAppTheme>['theme'];

export const createStyles = (colors: ThemeColors, theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: theme.spacing.xxl + theme.spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.screenPadding,
  },
  titleWrap: {
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
  scrollContent: {
    paddingHorizontal: theme.spacing.screenPadding,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  sectionCard: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  sectionHeader: {
    gap: 2,
  },
  sectionTitle: {
    ...theme.typography.h3,
  },
  sectionSubtitle: {
    ...theme.typography.caption,
  },
  emptyText: {
    ...theme.typography.body,
    color: colors.textSecondary,
  },
  entryCard: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  entryTitleWrap: {
    flex: 1,
    gap: 2,
  },
  entryName: {
    ...theme.typography.bodyBold,
  },
  entryMeta: {
    ...theme.typography.caption,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  groupSummary: {
    ...theme.typography.body,
    color: colors.textSecondary,
  },
  hintText: {
    ...theme.typography.small,
    color: colors.textTertiary,
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailTitle: {
    ...theme.typography.bodyBold,
  },
  detailGrid: {
    gap: theme.spacing.xs,
  },
  detailText: {
    ...theme.typography.caption,
  },
  itemList: {
    gap: theme.spacing.sm,
  },
  headerRightRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  headerIconBtn: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    borderRadius: theme.radius.lg,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editInput: {
    ...theme.typography.h2,
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingVertical: 2,
    marginBottom: theme.spacing.xs,
  },
  deleteItemBtn: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
    backgroundColor: colors.error + '20',
    borderRadius: theme.radius.sm,
  },
  powerBtn: {
    padding: theme.spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  addDeviceBtn: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    marginTop: theme.spacing.sm,
  },
  addDeviceText: {
    ...theme.typography.bodyBold,
    color: colors.primary,
  },
  deleteGroupBtn: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: colors.error + '15',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error,
    marginTop: theme.spacing.xl,
  },
  deleteGroupText: {
    ...theme.typography.bodyBold,
    color: colors.error,
  },
  childCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: theme.spacing.sm,
  },
  childHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  childInfo: {
    flex: 1,
    gap: 2,
  },
  childName: {
    ...theme.typography.body,
    fontWeight: '600',
  },
  warrantyBadge: {
    backgroundColor: colors.warningBackground,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  warrantyText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.warning,
  },
});
