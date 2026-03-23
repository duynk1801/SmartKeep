import { Dimensions, Platform } from 'react-native';

import { Colors } from './colors';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * SmartKeep Design System Theme Tokens
 *
 * Dark neon cyan theme with glassmorphism.
 * Consistent 24px radius, neon glow shadows.
 */
export const Theme = {
  typography: {
    h1: { fontSize: 28, fontWeight: '800' as const, lineHeight: 34, color: Colors.text },
    greeting: { fontSize: 28, fontWeight: '800' as const, lineHeight: 34, color: Colors.text },
    h2: { fontSize: 24, fontWeight: '700' as const, lineHeight: 30, color: Colors.text },
    h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24, color: Colors.text },
    body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22, color: Colors.text },
    bodyBold: { fontSize: 16, fontWeight: '600' as const, lineHeight: 22, color: Colors.text },
    caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18, color: Colors.textSecondary },
    small: { fontSize: 11, fontWeight: '500' as const, lineHeight: 16, color: Colors.textSecondary },
    stat: { fontSize: 32, fontWeight: '800' as const, lineHeight: 38, color: Colors.text },
    subtitle: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22, color: Colors.textAccent },
    buttonText: { fontSize: 16, fontWeight: '600' as const, lineHeight: 22, color: Colors.text },
    label: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20, color: Colors.textSecondary },
    input: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22, color: Colors.text },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    screenPadding: 20,
    cardGap: 16,
    sectionGap: 24,
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    pill: 50,
    full: 9999,
  },

  // ─── Glassmorphism Presets (Neon Cyan borders) ──
  glass: {
    card: {
      backgroundColor: Colors.glass,
      borderWidth: 1,
      borderColor: Colors.glassBorder,
      borderRadius: 24,
    },
    cardElevated: {
      backgroundColor: Colors.glassElevated,
      borderWidth: 1,
      borderColor: Colors.glassHighlight,
      borderRadius: 24,
    },
    pill: {
      backgroundColor: Colors.glass,
      borderWidth: 1,
      borderColor: Colors.glassBorder,
      borderRadius: 50,
    },
    input: {
      backgroundColor: Colors.glass,
      borderWidth: 1,
      borderColor: Colors.glassBorder,
      borderRadius: 16,
    },
  },

  shadow: {
    none: {},
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    neonGlow: {
      shadowColor: Colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    },
    neonGlowStrong: {
      shadowColor: Colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 24,
      elevation: 12,
    },
  },
} as const;
