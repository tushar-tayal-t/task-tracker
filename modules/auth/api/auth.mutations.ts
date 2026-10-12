'use client';

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { authApi } from './auth.api';
import { authKeys } from './auth.keys';
import { LoginFormData } from '../schemas/auth.schema';
import { AuthSession } from '../types/auth.types';
import { ApiError } from '@/lib/api/errors';

export function useLoginMutation(
  options?: UseMutationOptions<AuthSession, ApiError, LoginFormData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (credentials: LoginFormData) => authApi.login(credentials),
    onSuccess: (data, variables, context, meta) => {
      // Store token if browser
      if (typeof window !== 'undefined' && data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      // Update session query cache
      queryClient.setQueryData(authKeys.session(), data);

      options?.onSuccess?.(data, variables, context, meta);
    },
    onError: (error, variables, context, meta) => {
      options?.onError?.(error, variables, context, meta);
    },
  });
}
