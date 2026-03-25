import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import { LoginScreen } from '@/src/components/features/LoginScreen';
import { HomeControl } from '@/src/components/features/HomeControl';
import { GroupDetail } from '@/src/components/features/GroupDetail';
import { AddDeviceSheet } from '@/src/components/features/AddDevices';
import { SettingsScreen } from '@/src/components/features/SettingsScreen';
import { DrawerMenu } from '@/src/components/common/DrawerMenu';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { ScreenName } from '@/src/constants/enums';

type AppState = 'login' | 'authenticated';

/**
 * Root app screen — manages auth state + drawer navigation.
 *
 * The Figma design uses a single-screen approach with
 * a right-side drawer — NO tabs. Navigation is:
 * Login → Home Control ↔ Remote Control ↔ My Computer
 * via the hamburger drawer menu.
 */
export default function HomeScreen() {
  const colors = useThemeColors();
  const styles = React.useMemo(() => createStyles(colors.background), [colors.background]);
  const [appState, setAppState] = useState<AppState>('login');
  const [currentScreen, setCurrentScreen] = useState<string>(ScreenName.HOME);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [addDeviceSheetVisible, setAddDeviceSheetVisible] = useState(false);

  // ─── Auth Handlers ──────────────────
  const handleLogin = useCallback(() => {
    setAppState('authenticated');
    setCurrentScreen(ScreenName.HOME);
  }, []);

  const handleGoogleLogin = useCallback(() => {
    // TODO: Implement Google OAuth via Supabase
    setAppState('authenticated');
    setCurrentScreen(ScreenName.HOME);
  }, []);

  const handleSignUp = useCallback(() => {
    // TODO: Navigate to sign up screen
    console.log('[App] Sign up pressed');
  }, []);

  const handleForgotPassword = useCallback(() => {
    // TODO: Navigate to forgot password
    console.log('[App] Forgot password pressed');
  }, []);

  // ─── Drawer Handlers ────────────────
  const handleOpenDrawer = useCallback(() => {
    setDrawerVisible(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDrawerVisible(false);
  }, []);

  const handleNavigate = useCallback((screen: string) => {
    setDrawerVisible(false);
    if (screen === ScreenName.ADD_DEVICES) {
      setAddDeviceSheetVisible(true);
      return;
    }
    setCurrentScreen(screen);
  }, []);

  const handleLogout = useCallback(() => {
    setDrawerVisible(false);
    setAppState('login');
  }, []);

  // ─── Login State ────────────────────
  if (appState === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        onSignUp={handleSignUp}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  // ─── Authenticated State ────────────
  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenName.HOME:
        return <HomeControl onOpenDrawer={handleOpenDrawer} />;
      case ScreenName.SETTINGS:
        return <SettingsScreen onOpenDrawer={handleOpenDrawer} />;
      default:
        // By default, if it's not a main screen, assume it's a dynamic group ID
        return <GroupDetail groupId={currentScreen} onOpenDrawer={handleOpenDrawer} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <DrawerMenu
        visible={drawerVisible}
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onClose={handleCloseDrawer}
      />
      <AddDeviceSheet
        visible={addDeviceSheetVisible}
        onClose={() => setAddDeviceSheetVisible(false)}
        onSuccess={(groupId: string) => setCurrentScreen(groupId)}
      />
    </View>
  );
}

const createStyles = (backgroundColor: string) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
});
