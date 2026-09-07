import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { THEME, SCAN_BUTTON } from '../config/constants';

interface ScanButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function ScanButton({ onPress, loading = false, disabled = false }: ScanButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      testID={SCAN_BUTTON.TEST_ID}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        (disabled || loading) && styles.buttonDisabled,
      ]}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.label}>{SCAN_BUTTON.LABEL}</Text>
        <Text style={styles.arrow}>→</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    marginBottom: 28,
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    height: 52,
    backgroundImage: 'linear-gradient(rgb(85, 215, 245), rgb(92, 174, 255))',
    backgroundColor: THEME.ACCENT_BLUE,
  },
  icon: {
    fontSize: 21,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: '#061014',
  },
  arrow: {
    fontSize: 18,
    color: '#061014',
  },
});
