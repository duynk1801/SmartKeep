import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '@/src/constants/colors';
import { Theme } from '@/src/constants/theme';

export default function WarrantiesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warranties</Text>
      <Text style={styles.subtitle}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Theme.typography.h2,
  },
  subtitle: {
    ...Theme.typography.subtitle,
    marginTop: Theme.spacing.sm,
  },
});
