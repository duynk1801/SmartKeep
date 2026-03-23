import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '@/src/constants/colors';

interface ScanOverlayProps {
  isScanning: boolean;
  message?: string;
}

function ScanOverlayComponent({ isScanning, message }: ScanOverlayProps) {
  if (!isScanning) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.scanFrame}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

export const ScanOverlay = React.memo(ScanOverlayComponent);

const CORNER_SIZE = 30;
const CORNER_BORDER = 3;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_BORDER,
    borderLeftWidth: CORNER_BORDER,
    borderColor: Colors.primary,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_BORDER,
    borderRightWidth: CORNER_BORDER,
    borderColor: Colors.primary,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_BORDER,
    borderLeftWidth: CORNER_BORDER,
    borderColor: Colors.primary,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_BORDER,
    borderRightWidth: CORNER_BORDER,
    borderColor: Colors.primary,
  },
  message: {
    marginTop: 24,
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
  },
});
