import React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';

import { GlassCard } from './GlassCard';
import { Colors } from '@/src/constants/colors';
import { Theme } from '@/src/constants/theme';

interface StatCardProps {
  icon: string;
  value: string;
  unit?: string;
  label: string;
  style?: ViewStyle;
}

function StatCardComponent({ icon, value, unit, label, style }: StatCardProps) {
  return (
    <GlassCard style={[styles.container, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </GlassCard>
  );
}

export const StatCard = React.memo(StatCardComponent);

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.md,
    alignItems: 'flex-start',
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginBottom: Theme.spacing.sm,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    ...Theme.typography.stat,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginLeft: 2,
  },
  label: {
    ...Theme.typography.caption,
    marginTop: Theme.spacing.xs,
  },
});
