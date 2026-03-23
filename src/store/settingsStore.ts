import { create } from 'zustand';

export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'vi';
export type PrimaryMenuScreen = 'home' | 'remote' | 'computer';

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
  primaryMenuOrder: ['home', 'remote', 'computer'],

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
