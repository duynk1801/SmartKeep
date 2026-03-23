import type { Session, User } from '@supabase/supabase-js';

/**
 * Authentication Types
 */

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
