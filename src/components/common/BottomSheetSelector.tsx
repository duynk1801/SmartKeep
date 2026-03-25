import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { X } from 'lucide-react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/useAppTheme';

export interface BottomSheetOption {
  label: string;
  value: string;
}

interface BottomSheetSelectorProps {
  visible: boolean;
  options: BottomSheetOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  title: string;
}

export const BottomSheetSelector: React.FC<BottomSheetSelectorProps> = ({
  visible,
  options,
  selectedValue,
  onSelect,
  onClose,
  title,
}) => {
  const { colors, theme } = useAppTheme();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, opacityAnim]);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.overlay,
            { backgroundColor: 'rgba(0,0,0,0.5)', opacity: opacityAnim },
          ]}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.sheet,
          { backgroundColor: colors.background, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => {
            const isSelected = item.value === selectedValue;
            return (
              <TouchableOpacity
                style={[
                  styles.option,
                  { borderBottomColor: colors.glassBorder },
                  isSelected && { backgroundColor: colors.primary + '22' },
                ]}
                onPress={() => {
                  onSelect(item.value);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: isSelected ? colors.primary : colors.textSecondary },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
        />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: SCREEN_HEIGHT * 0.5,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});
