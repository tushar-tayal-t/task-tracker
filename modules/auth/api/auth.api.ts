import { apiClient } from '@/lib/api/client';
import { LoginFormData, RegisterFormData } from '../schemas/auth.schema';
import { AuthSession } from '../types/auth.types';

export const authApi = {
  /**
   * Submit login credentials to external backend
   */
  login: async (credentials: LoginFormData): Promise<AuthSession> => {
    return apiClient.post<AuthSession>('/auth/login', credentials);
  },

  /**
   * Register a new user on external backend
   */
  register: async (credentials: RegisterFormData): Promise<AuthSession> => {
    return apiClient.post<AuthSession>('/auth/register', credentials);
  },

  /**
   * Log out active user session
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },

  /**
   * Fetch current authenticated user session
   */
  getCurrentUser: async (): Promise<AuthSession> => {
    return apiClient.get<AuthSession>('/auth/me');
  },
};
