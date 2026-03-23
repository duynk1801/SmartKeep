/**
 * App Configuration Constants
 *
 * Supabase credentials and feature flags.
 * In production, these should come from environment variables.
 */

// --- Supabase ---
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://your-project.supabase.co';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'your-anon-key';

// --- Feature Flags ---
export const FEATURE_FLAGS = {
  ENABLE_BLUETOOTH: true,
  ENABLE_WAKE_ON_LAN: true,
  ENABLE_OCR_SCAN: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
} as const;

// --- Warranty Thresholds ---
export const WARRANTY_EXPIRY_WARNING_DAYS = 30;

// --- Bluetooth ---
export const BLE_SCAN_TIMEOUT_MS = 10_000;
export const BLE_CONNECTION_TIMEOUT_MS = 5_000;
