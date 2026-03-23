import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useSettingsStore } from '@/src/store/settingsStore';

export { ErrorBoundary } from 'expo-router';

if (__DEV__) {
  require('../ReactotronConfig');
}

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colors = useThemeColors();
  const themeMode = useSettingsStore((s) => s.themeMode);
  const navigationTheme = React.useMemo(
    () => ({
      ...(themeMode === 'dark' ? DarkTheme : DefaultTheme),
      colors: {
        ...(themeMode === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.warning,
      },
    }),
    [colors, themeMode],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name='(tabs)' />
          <Stack.Screen name='(auth)' options={{ animation: 'fade' }} />
          <Stack.Screen name='(modals)' options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
