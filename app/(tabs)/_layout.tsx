import React from 'react';
import { Tabs } from 'expo-router';

import { Colors } from '@/src/constants/colors';

/**
 * Tab layout — Figma design uses drawer navigation, not tabs.
 * Only the index screen is visible; tab bar is hidden.
 * All navigation happens via DrawerMenu inside index.tsx.
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="warranties" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="two" options={{ href: null }} />
    </Tabs>
  );
}
