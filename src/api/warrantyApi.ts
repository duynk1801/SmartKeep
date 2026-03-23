import { supabase } from './supabase';
import type { Warranty, WarrantyInsert, WarrantyUpdate } from '@/src/types/database';

export const warrantyApi = {
  async getAll(): Promise<Warranty[]> {
    const { data, error } = await supabase
      .from('warranties')
      .select('*')
      .order('expiry_date', { ascending: true });

    if (error) throw error;
    return data ?? [];
  },

  async getByDeviceId(deviceId: string): Promise<Warranty[]> {
    const { data, error } = await supabase
      .from('warranties')
      .select('*')
      .eq('device_id', deviceId);

    if (error) throw error;
    return data ?? [];
  },

  async create(warranty: WarrantyInsert): Promise<Warranty> {
    const { data, error } = await supabase
      .from('warranties')
      .insert(warranty)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: WarrantyUpdate): Promise<Warranty> {
    const { data, error } = await supabase
      .from('warranties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from('warranties').delete().eq('id', id);
    if (error) throw error;
  },
} as const;
