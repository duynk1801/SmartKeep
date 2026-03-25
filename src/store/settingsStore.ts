import { create } from 'zustand';

import { ScreenName } from '@/src/constants/enums';

export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'vi';
export type PrimaryMenuScreen = string;

interface SettingsState {
  themeMode: ThemeMode;
  language: Language;
  primaryMenuOrder: PrimaryMenuScreen[];
}

interface SettingsActions {
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  setPrimaryMenuOrder: (order: PrimaryMenuScreen[]) => void;
}

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create<SettingsStore>((set) => ({
  // --- State ---
  themeMode: 'dark',
  language: 'en',
  primaryMenuOrder: [ScreenName.HOME, 'group-1', 'group-2'],

  // --- Actions ---
  setThemeMode: (mode) =>
    set({ themeMode: mode }),

  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === 'dark' ? 'light' : 'dark',
    })),

  setLanguage: (language) =>
    set({ language }),

  setPrimaryMenuOrder: (primaryMenuOrder) =>
    set({ primaryMenuOrder }),
}));
