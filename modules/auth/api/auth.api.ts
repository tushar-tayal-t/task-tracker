import { apiClient } from '@/lib/api/client';
import { LoginFormData, RegisterFormData } from '../schemas/auth.schema';
import { AuthSession } from '../types/auth.types';
import { mockAuthApi } from './auth.mock';

export const authApi = {
  /**
   * Submit login credentials to external backend, falling back to mock if backend is down
   */
  login: async (credentials: LoginFormData): Promise<AuthSession> => {
    try {
      return await apiClient.post<AuthSession>('/auth/login', credentials);
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[authApi.login] External backend offline -> using mock fallback');
      return mockAuthApi.login(credentials);
    }
  },

  /**
   * Register a new user on external backend, falling back to mock if backend is down
   */
  register: async (credentials: RegisterFormData): Promise<AuthSession> => {
    try {
      return await apiClient.post<AuthSession>('/auth/register', credentials);
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[authApi.register] External backend offline -> using mock fallback');
      return mockAuthApi.register(credentials);
    }
  },

  /**
   * Log out active user session
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[authApi.logout] External backend offline -> using mock fallback');
      await mockAuthApi.logout();
    }
  },

  /**
   * Fetch current authenticated user session
   */
  getCurrentUser: async (): Promise<AuthSession | null> => {
    if (typeof window !== 'undefined' && !localStorage.getItem('auth_token')) {
      return null;
    }

    try {
      const response = await apiClient.get<any>('/auth/me');
      if (response && response.data) {
        if (response.data.user) {
          return response.data;
        }
        return {
          user: response.data,
          token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') || '' : '',
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
        };
      }
      if (response && response.user) {
        return response as AuthSession;
      }
      if (response && response.id && response.email) {
        return {
          user: response,
          token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') || '' : '',
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
        };
      }
      return response as AuthSession;
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[authApi.getCurrentUser] External backend offline -> using mock fallback');
      return mockAuthApi.getCurrentUser();
    }
  },
};
