import { supabase } from './supabase';
import type { Device, DeviceInsert, DeviceUpdate } from '@/src/types/database';

export const deviceApi = {
  async getAll(): Promise<Device[]> {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<Device | null> {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(device: DeviceInsert): Promise<Device> {
    const { data, error } = await supabase
      .from('devices')
      .insert(device)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: DeviceUpdate): Promise<Device> {
    const { data, error } = await supabase
      .from('devices')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from('devices').delete().eq('id', id);
    if (error) throw error;
  },
} as const;
