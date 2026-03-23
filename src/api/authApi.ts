import { supabase } from './supabase';
import type { AuthCredentials, AuthResponse } from '@/src/types/auth';

export const authApi = {
  async signIn({ email, password }: AuthCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return {
      user: data.user,
      session: data.session,
    };
  },

  async signUp({ email, password }: AuthCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return {
      user: data.user,
      session: data.session,
    };
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
} as const;
