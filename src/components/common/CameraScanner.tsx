import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { X, Camera as CameraIcon } from 'lucide-react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/useAppTheme';

interface CameraScannerProps {
  visible: boolean;
  onScan: (data: string) => void;
  onClose: () => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  visible,
  onScan,
  onClose,
}) => {
  const { colors } = useAppTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  React.useEffect(() => {
    if (visible && hasPermission === null) {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
  }, [visible, hasPermission]);

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Scan Serial Number</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.cameraContainer}>
          {hasPermission === false ? (
            <View style={styles.noAccess}>
              <Text style={{ color: colors.error }}>No access to camera</Text>
            </View>
          ) : hasPermission === true ? (
            <CameraView
              style={styles.camera}
              barcodeScannerSettings={{ barcodeTypes: ['qr', 'code128', 'ean13'] }}
              onBarcodeScanned={({ data }) => {
                onScan(data);
                onClose();
              }}
            />
          ) : (
            <View style={styles.noAccess}>
              <Text style={{ color: colors.textSecondary }}>Requesting permission...</Text>
            </View>
          )}

          {/* Overlay Box */}
          <View style={[styles.overlayBox, { borderColor: colors.primary }]} />
        </View>

        <View style={styles.footer}>
          <CameraIcon size={32} color={colors.primary} />
          <Text style={[styles.instruction, { color: colors.textSecondary }]}>
            Align barcode within the frame to scan
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayBox: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.4,
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  noAccess: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 32,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
  },
});
