import { useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';

import { authApi } from '@/src/api';
import { useAuthStore } from '@/src/store/authStore';
import type { AuthCredentials } from '@/src/types';

/**
 * useAuth — Manages authentication state and actions.
 *
 * Listens to Supabase auth state changes and syncs with Zustand store.
 */
export function useAuth() {
  const { user, session, isLoading, setAuth, setLoading, clearAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const { data: subscription } = authApi.onAuthStateChange((_event, newSession) => {
      if (newSession) {
        setAuth(newSession.user, newSession);
      } else {
        clearAuth();
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [setAuth, clearAuth]);

  const signIn = useCallback(
    async (credentials: AuthCredentials) => {
      setLoading(true);
      try {
        const response = await authApi.signIn(credentials);
        setAuth(response.user, response.session);
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading],
  );

  const signUp = useCallback(
    async (credentials: AuthCredentials) => {
      setLoading(true);
      try {
        const response = await authApi.signUp(credentials);
        setAuth(response.user, response.session);
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading],
  );

  const signOut = useCallback(async () => {
    await authApi.signOut();
    clearAuth();
    router.replace('/(auth)/login');
  }, [clearAuth, router]);

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    signIn,
    signUp,
    signOut,
  } as const;
}
