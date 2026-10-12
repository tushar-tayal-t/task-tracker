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
  options?: Omit<UseQueryOptions<AuthSession | null, Error>, 'queryKey' | 'queryFn'>
) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasToken = mounted && typeof window !== 'undefined' && Boolean(localStorage.getItem('auth_token'));

  const query = useQuery<AuthSession | null, Error>({
    queryKey: authKeys.session(),
    queryFn: () => authApi.getCurrentUser(),
    enabled: hasToken,
    staleTime: 5 * 60 * 1000, // 5 minutes in-memory freshness
    retry: false, // Do not loop if token is invalid (401)
    ...options,
  });

  return {
    ...query,
    isInitializing: !mounted,
  };
}
