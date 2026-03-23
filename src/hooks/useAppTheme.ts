import { useMemo } from 'react';

import { Theme } from '@/src/constants/theme';
import { useThemeColors } from '@/src/hooks/useThemeColors';

export function useAppTheme() {
  const colors = useThemeColors();

  const theme = useMemo(() => ({
    spacing: Theme.spacing,
    radius: Theme.radius,
    typography: {
      h1: { fontSize: 28, fontWeight: '800' as const, lineHeight: 34, color: colors.text },
      h2: { fontSize: 24, fontWeight: '700' as const, lineHeight: 30, color: colors.text },
      h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24, color: colors.text },
      body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22, color: colors.text },
      bodyBold: { fontSize: 16, fontWeight: '600' as const, lineHeight: 22, color: colors.text },
      caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18, color: colors.textSecondary },
      small: { fontSize: 11, fontWeight: '500' as const, lineHeight: 16, color: colors.textSecondary },
      stat: { fontSize: 32, fontWeight: '800' as const, lineHeight: 38, color: colors.text },
      subtitle: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22, color: colors.textAccent },
      buttonText: { fontSize: 16, fontWeight: '600' as const, lineHeight: 22, color: colors.text },
      label: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20, color: colors.textSecondary },
      input: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22, color: colors.text },
    },
    glass: {
      card: {
        backgroundColor: colors.glass,
        borderWidth: 1,
        borderColor: colors.glassBorder,
        borderRadius: Theme.radius.xl,
      },
      cardElevated: {
        backgroundColor: colors.glassElevated,
        borderWidth: 1,
        borderColor: colors.glassHighlight,
        borderRadius: Theme.radius.xl,
      },
      pill: {
        backgroundColor: colors.glass,
        borderWidth: 1,
        borderColor: colors.glassBorder,
        borderRadius: Theme.radius.pill,
      },
      input: {
        backgroundColor: colors.glass,
        borderWidth: 1,
        borderColor: colors.glassBorder,
        borderRadius: Theme.radius.lg,
      },
    },
    shadow: {
      none: {},
      sm: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 2,
      },
      md: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
      },
      neonGlow: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
      },
      neonGlowStrong: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 24,
        elevation: 12,
      },
    },
  }), [colors]);

  return { colors, theme } as const;
}
