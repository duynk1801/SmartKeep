import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle, type ViewProps } from 'react-native';

import { useAppTheme } from '@/src/hooks/useAppTheme';

interface GlassCardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'pill';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function GlassCardComponent({ variant = 'default', children, style, ...rest }: GlassCardProps) {
  const { theme } = useAppTheme();

  const variantStyle = variant === 'elevated'
    ? theme.glass.cardElevated
    : variant === 'pill'
      ? theme.glass.pill
      : theme.glass.card;

  return (
    <View style={[styles.base, variantStyle, style]} {...rest}>
      {children}
    </View>
  );
}

export const GlassCard = React.memo(GlassCardComponent);

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
