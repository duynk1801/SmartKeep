import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import { LoginScreen } from '@/src/components/features/LoginScreen';
import { HomeControl } from '@/src/components/features/HomeControl';
import { RemoteControl } from '@/src/components/features/RemoteControl';
import { MyComputer } from '@/src/components/features/MyComputer';
import { AddDevices } from '@/src/components/features/AddDevices';
import { SettingsScreen } from '@/src/components/features/SettingsScreen';
import { DrawerMenu } from '@/src/components/common/DrawerMenu';
import { useThemeColors } from '@/src/hooks/useThemeColors';

type ScreenName = 'home' | 'remote' | 'computer' | 'add-devices' | 'settings';
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
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [drawerVisible, setDrawerVisible] = useState(false);

  // ─── Auth Handlers ──────────────────
  const handleLogin = useCallback(() => {
    setAppState('authenticated');
    setCurrentScreen('home');
  }, []);

  const handleGoogleLogin = useCallback(() => {
    // TODO: Implement Google OAuth via Supabase
    setAppState('authenticated');
    setCurrentScreen('home');
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

  const handleNavigate = useCallback((screen: ScreenName) => {
    setCurrentScreen(screen);
    setDrawerVisible(false);
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
      case 'home':
        return <HomeControl onOpenDrawer={handleOpenDrawer} />;
      case 'remote':
        return <RemoteControl onOpenDrawer={handleOpenDrawer} />;
      case 'computer':
        return <MyComputer onOpenDrawer={handleOpenDrawer} />;
      case 'add-devices':
        return (
          <AddDevices
            onOpenDrawer={handleOpenDrawer}
            onReviewInventory={() => setCurrentScreen('computer')}
          />
        );
      case 'settings':
        return <SettingsScreen onOpenDrawer={handleOpenDrawer} />;
      default:
        return <HomeControl onOpenDrawer={handleOpenDrawer} />;
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
    </View>
  );
}

const createStyles = (backgroundColor: string) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
});
