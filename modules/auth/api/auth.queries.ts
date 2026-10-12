'use client';

import { useState, useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { authApi } from './auth.api';
import { authKeys } from './auth.keys';
import { AuthSession } from '../types/auth.types';

/**
 * Hook that fetches the current authenticated user session (GET /auth/me).
 * Reactively reads localStorage on client mount without triggering hydration mismatches.
 */
export function useCurrentUserQuery(
  options?: Omit<UseQueryOptions<AuthSession, Error>, 'queryKey' | 'queryFn'>
) {
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('auth_token');
    if (stored) {
      setToken(stored);
    }
  }, []);

  return useQuery<AuthSession, Error>({
    queryKey: authKeys.session(),
    queryFn: () => authApi.getCurrentUser(),
    enabled: mounted && Boolean(token),
    staleTime: 5 * 60 * 1000, // 5 minutes in-memory freshness
    retry: false, // Do not loop if token is invalid (401)
    ...options,
  });
}
