import type { DeviceType } from '@/src/constants/deviceTypes';

/**
 * Supabase Database Schema Types
 *
 * These interfaces mirror the Supabase table definitions.
 * Regenerate with: `npx supabase gen types typescript --local > src/types/database.ts`
 */

// ─── Database Root ──────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      devices: {
        Row: Device;
        Insert: DeviceInsert;
        Update: DeviceUpdate;
      };
      warranties: {
        Row: Warranty;
        Insert: WarrantyInsert;
        Update: WarrantyUpdate;
      };
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
    };
  };
}

// ─── Devices ────────────────────────────────────────────────

export interface Device {
  id: string;
  user_id: string;
  name: string;
  device_type: DeviceType;
  connection_type: 'wifi' | 'bluetooth';
  mac_address: string | null;
  ip_address: string | null;
  serial_number: string | null;
  is_online: boolean;
  last_seen: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type DeviceInsert = Omit<Device, 'id' | 'created_at' | 'updated_at' | 'is_online' | 'last_seen'>;
export type DeviceUpdate = Partial<Omit<Device, 'id' | 'user_id' | 'created_at'>>;

// ─── Warranties ─────────────────────────────────────────────

export interface Warranty {
  id: string;
  device_id: string;
  user_id: string;
  provider: string;
  purchase_date: string;
  expiry_date: string;
  receipt_image_url: string | null;
  serial_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type WarrantyInsert = Omit<Warranty, 'id' | 'created_at' | 'updated_at'>;
export type WarrantyUpdate = Partial<Omit<Warranty, 'id' | 'user_id' | 'device_id' | 'created_at'>>;

// ─── Profiles ───────────────────────────────────────────────

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>;
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>;
