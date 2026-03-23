import { useMemo } from 'react';

import { DarkColors, LightColors } from '@/src/constants/colors';
import { useSettingsStore } from '@/src/store/settingsStore';

import type { ThemeColors } from '@/src/constants/colors';

/**
 * Returns the active color palette based on the current theme mode.
 * Memoized to prevent unnecessary re-renders.
 */
export function useThemeColors(): ThemeColors {
  const themeMode = useSettingsStore((s) => s.themeMode);

  return useMemo(
    () => (themeMode === 'dark' ? DarkColors : LightColors),
    [themeMode],
  );
}
