import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/useAppTheme';

export const createStyles = (
  colors: ReturnType<typeof useAppTheme>['colors'],
  theme: ReturnType<typeof useAppTheme>['theme'],
) =>
  StyleSheet.create({
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
      marginBottom: theme.spacing.sm,
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
