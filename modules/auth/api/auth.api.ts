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
  getCurrentUser: async (): Promise<AuthSession> => {
    try {
      return await apiClient.get<AuthSession>('/auth/me');
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[authApi.getCurrentUser] External backend offline -> using mock fallback');
      return mockAuthApi.getCurrentUser();
    }
  },
};
