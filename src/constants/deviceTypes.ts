/**
 * Device Type Definitions
 *
 * Enum + label mapping for all supported IoT device categories.
 * Extend this as new device types are added.
 */

export enum DeviceType {
  FAN = 'fan',
  AC = 'ac',
  PC = 'pc',
  SMART_LIGHT = 'smart_light',
  ROUTER = 'router',
  CAMERA = 'camera',
  OTHER = 'other',
}

export const DEVICE_TYPE_LABELS: Record<DeviceType, string> = {
  [DeviceType.FAN]: 'Fan',
  [DeviceType.AC]: 'Air Conditioner',
  [DeviceType.PC]: 'PC / Computer',
  [DeviceType.SMART_LIGHT]: 'Smart Light',
  [DeviceType.ROUTER]: 'Router',
  [DeviceType.CAMERA]: 'Camera',
  [DeviceType.OTHER]: 'Other',
} as const;

export const DEVICE_TYPE_ICONS: Record<DeviceType, string> = {
  [DeviceType.FAN]: '🌀',
  [DeviceType.AC]: '❄️',
  [DeviceType.PC]: '💻',
  [DeviceType.SMART_LIGHT]: '💡',
  [DeviceType.ROUTER]: '📡',
  [DeviceType.CAMERA]: '📷',
  [DeviceType.OTHER]: '📦',
} as const;
