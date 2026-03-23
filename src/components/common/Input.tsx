import React, { useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { Colors } from '@/src/constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

function InputComponent({
  label,
  error,
  containerStyle,
  ...textInputProps
}: InputProps) {
  const handleChangeText = useCallback(
    (text: string) => {
      textInputProps.onChangeText?.(text);
    },
    [textInputProps.onChangeText],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...textInputProps}
        onChangeText={handleChangeText}
        style={[styles.input, error ? styles.inputError : null, textInputProps.style]}
        placeholderTextColor={Colors.textSecondary}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export const Input = React.memo(InputComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
  },
});
