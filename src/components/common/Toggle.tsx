import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from 'react-native';

import { SCREEN_WIDTH } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/useAppTheme';

interface ToggleProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
}

const TRACK_WIDTH = SCREEN_WIDTH * 0.13;
const TRACK_HEIGHT = SCREEN_WIDTH * 0.07;
const THUMB_SIZE = TRACK_HEIGHT - 6;
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - 6;

function ToggleComponent({ value, onValueChange, disabled = false }: ToggleProps) {
  const { colors } = useAppTheme();
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 60,
    }).start();
  }, [value, animatedValue]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onValueChange(!value);
    }
  }, [value, onValueChange, disabled]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, TRAVEL + 3],
  });

  const trackColor = value ? colors.primary : colors.glass;
  const borderColor = value ? colors.primary : colors.glassBorder;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <View
        style={[
          styles.track,
          { backgroundColor: trackColor, borderColor },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: colors.white },
            { transform: [{ translateX }] },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

export const Toggle = React.memo(ToggleComponent);

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    borderWidth: 1,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
  },
});
