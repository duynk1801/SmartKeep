import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

import { Theme, SCREEN_WIDTH } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/useAppTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'glass' | 'outline' | 'pill';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

function ButtonComponent({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const { colors, theme } = useAppTheme();
  const isDisabled = disabled || loading;

  const variantStyles = StyleSheet.create({
    primary: {
      backgroundColor: colors.primary,
    },
    glass: {
      ...theme.glass.card,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.glassBorder,
      borderRadius: theme.radius.lg,
    },
    pill: {
      ...theme.glass.pill,
      paddingVertical: SCREEN_WIDTH * 0.02,
      paddingHorizontal: SCREEN_WIDTH * 0.05,
    },
  });

  const variantTextStyles = StyleSheet.create({
    primary: {
      color: colors.textInverse,
      fontWeight: '700',
    },
    glass: {
      color: colors.text,
    },
    outline: {
      color: colors.text,
    },
    pill: {
      color: colors.text,
      fontSize: 13,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        variantStyles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.white}
        />
      ) : (
        <Text
          style={[
            styles.text,
            variantTextStyles[variant],
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export const Button = React.memo(ButtonComponent);

const styles = StyleSheet.create({
  base: {
    paddingVertical: SCREEN_WIDTH * 0.035,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    borderRadius: Theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...Theme.typography.buttonText,
  },
});
