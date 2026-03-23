import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';

interface AuthStoreState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

interface AuthStoreActions {
  setAuth: (user: User | null, session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearAuth: () => void;
}

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>((set) => ({
  // --- State ---
  user: null,
  session: null,
  isLoading: true,

  // --- Actions ---
  setAuth: (user, session) =>
    set({ user, session, isLoading: false }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  clearAuth: () =>
    set({ user: null, session: null, isLoading: false }),
}));
