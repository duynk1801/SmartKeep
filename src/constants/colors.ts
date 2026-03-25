/**
 * SmartKeep Color Palette — Dual Theme Support
 *
 * Dark: Deep dark background + neon cyan (#00D9FF) accent + glassmorphism.
 * Light: Clean white/gray background + teal accent + soft shadows.
 */

export interface ThemeColors {
  // ─── Background ─────────────────────────────────
  background: string;
  backgroundSecondary: string;
  backgroundGradientStart: string;
  backgroundGradientMid: string;
  backgroundGradientEnd: string;

  // ─── Glass Surfaces ─────────────────────────────
  glass: string;
  glassElevated: string;
  glassBorder: string;
  glassHighlight: string;

  // ─── Brand / Accent ─────────────────────────────
  primary: string;
  primaryDark: string;
  primaryGlow: string;
  primaryGlowStrong: string;

  // ─── Text ───────────────────────────────────────
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  textAccent: string;

  // ─── Semantic ───────────────────────────────────
  success: string;
  successBackground: string;
  warning: string;
  warningBackground: string;
  error: string;
  errorBackground: string;
  info: string;

  // ─── Interactive ────────────────────────────────
  active: string;
  inactive: string;
  border: string;
  borderFocused: string;

  // ─── Drawer ─────────────────────────────────────
  drawerBackground: string;
  drawerItem: string;
  logout: string;
  logoutBackground: string;

  // ─── Neutral ────────────────────────────────────
  white: string;
  black: string;
  overlay: string;
  surface: string;
  surfaceElevated: string;

  // ─── Status Dots ────────────────────────────────
  statusActive: string;
  statusStandby: string;
  statusOff: string;
}

// ─── Dark Theme ───────────────────────────────────────
export const DarkColors: ThemeColors = {
  background: '#121212',
  backgroundSecondary: '#1A1F2E',
  backgroundGradientStart: '#121212',
  backgroundGradientMid: '#1A1F2E',
  backgroundGradientEnd: '#121212',

  glass: 'rgba(26, 31, 46, 0.80)',
  glassElevated: 'rgba(26, 31, 46, 0.90)',
  glassBorder: 'rgba(0, 217, 255, 0.20)',
  glassHighlight: 'rgba(0, 209, 255, 0.30)',

  primary: '#00D1FF',
  primaryDark: '#0099CC',
  primaryGlow: 'rgba(0, 209, 255, 0.10)',
  primaryGlowStrong: 'rgba(0, 209, 255, 0.25)',

  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.60)',
  textTertiary: 'rgba(255, 255, 255, 0.40)',
  textInverse: '#121212',
  textAccent: '#00D1FF',

  success: '#4CD964',
  successBackground: 'rgba(76, 217, 100, 0.15)',
  warning: '#FF9500',
  warningBackground: 'rgba(255, 149, 0, 0.15)',
  error: '#FF3B30',
  errorBackground: 'rgba(255, 59, 48, 0.15)',
  info: '#5AC8FA',

  active: '#00D1FF',
  inactive: 'rgba(255, 255, 255, 0.30)',
  border: 'rgba(255, 255, 255, 0.10)',
  borderFocused: '#00D1FF',

  drawerBackground: 'rgba(15, 20, 25, 0.95)',
  drawerItem: 'rgba(26, 31, 46, 0.80)',
  logout: '#FF453A',
  logoutBackground: 'rgba(255, 69, 58, 0.10)',

  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.60)',
  surface: '#161B26',
  surfaceElevated: '#1E2535',

  statusActive: '#4CD964',
  statusStandby: '#6B7280',
  statusOff: '#4B5563',
};

// ─── Light Theme ──────────────────────────────────────
export const LightColors: ThemeColors = {
  background: '#F5F7FA',
  backgroundSecondary: '#FFFFFF',
  backgroundGradientStart: '#F5F7FA',
  backgroundGradientMid: '#EDF0F5',
  backgroundGradientEnd: '#F5F7FA',

  glass: 'rgba(255, 255, 255, 0.85)',
  glassElevated: 'rgba(255, 255, 255, 0.95)',
  glassBorder: 'rgba(0, 150, 180, 0.15)',
  glassHighlight: 'rgba(0, 150, 180, 0.20)',

  primary: '#0096B4',
  primaryDark: '#007A94',
  primaryGlow: 'rgba(0, 150, 180, 0.08)',
  primaryGlowStrong: 'rgba(0, 150, 180, 0.18)',

  text: '#1A2332',
  textSecondary: 'rgba(26, 35, 50, 0.55)',
  textTertiary: 'rgba(26, 35, 50, 0.35)',
  textInverse: '#FFFFFF',
  textAccent: '#0096B4',

  success: '#34C759',
  successBackground: 'rgba(52, 199, 89, 0.12)',
  warning: '#FF9500',
  warningBackground: 'rgba(255, 149, 0, 0.12)',
  error: '#FF3B30',
  errorBackground: 'rgba(255, 59, 48, 0.12)',
  info: '#007AFF',

  active: '#0096B4',
  inactive: 'rgba(26, 35, 50, 0.25)',
  border: 'rgba(26, 35, 50, 0.10)',
  borderFocused: '#0096B4',

  drawerBackground: 'rgba(245, 247, 250, 0.97)',
  drawerItem: 'rgba(255, 255, 255, 0.90)',
  logout: '#FF3B30',
  logoutBackground: 'rgba(255, 59, 48, 0.08)',

  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.30)',
  surface: '#FFFFFF',
  surfaceElevated: '#F0F2F7',

  statusActive: '#34C759',
  statusStandby: '#8E8E93',
  statusOff: '#C7C7CC',
};

/**
 * @deprecated Use `useThemeColors()` hook instead for dynamic theming.
 * Kept for backward compatibility during migration.
 */
export const Colors = DarkColors;

export type ColorKey = keyof ThemeColors;
