'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCurrentUserQuery } from '../api/auth.queries';
import { authApi } from '../api/auth.api';
import { authKeys } from '../api/auth.keys';
import { APP_CONFIG } from '@/config/app.config';

/**
 * Convenient custom hook for accessing authentication state across any page/component.
 */
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session, isLoading, isFetching } = useCurrentUserQuery();

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignored: cleanup local state regardless of network response
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }

    // Reset session cache
    queryClient.setQueryData(authKeys.session(), null);
    queryClient.removeQueries({ queryKey: authKeys.all });

    toast.info('Signed out successfully');
    router.push(APP_CONFIG.routes.login);
  };

  return {
    session: session ?? null,
    user: session?.user ?? null,
    isAuthenticated: Boolean(session?.user),
    isLoading: isLoading || isFetching,
    logout,
  };
}
