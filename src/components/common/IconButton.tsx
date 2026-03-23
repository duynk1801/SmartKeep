import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet, type ViewStyle } from 'react-native';
import { type LucideIcon } from 'lucide-react-native';

import { GlassCard } from './GlassCard';
import { Colors } from '@/src/constants/colors';
import { Theme, SCREEN_WIDTH } from '@/src/constants/theme';

interface IconButtonProps {
  Icon: LucideIcon;
  onPress: () => void;
  size?: number;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  active?: boolean;
  style?: ViewStyle;
}

function IconButtonComponent({
  Icon,
  onPress,
  size = SCREEN_WIDTH * 0.055,
  color,
  variant = 'glass',
  active = false,
  style,
}: IconButtonProps) {
  const iconColor = color ?? (active ? Colors.primary : Colors.text);
  const buttonSize = SCREEN_WIDTH * 0.13;

  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  if (variant === 'ghost') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.6}
        style={[styles.ghost, { width: buttonSize, height: buttonSize }, style]}
      >
        <Icon size={size} color={iconColor} />
      </TouchableOpacity>
    );
  }

  if (variant === 'solid') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[
          styles.solid,
          {
            width: buttonSize,
            height: buttonSize,
            backgroundColor: active ? Colors.primary : Colors.glassElevated,
          },
          style,
        ]}
      >
        <Icon size={size} color={active ? Colors.white : iconColor} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={style}>
      <GlassCard
        variant={active ? 'elevated' : 'default'}
        style={[styles.glassButton, { width: buttonSize, height: buttonSize }]}
      >
        <Icon size={size} color={iconColor} />
      </GlassCard>
    </TouchableOpacity>
  );
}

export const IconButton = React.memo(IconButtonComponent);

const styles = StyleSheet.create({
  glassButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    borderRadius: Theme.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghost: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
