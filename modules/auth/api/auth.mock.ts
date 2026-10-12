import { LoginFormData, RegisterFormData } from '../schemas/auth.schema';
import { AuthSession } from '../types/auth.types';

export const mockAuthApi = {
  /**
   * Mock login endpoint returning a dummy session
   */
  login: async (credentials: LoginFormData): Promise<AuthSession> => {
    // Artificial small delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      token: 'mock_jwt_token_development_mode',
      expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
      user: {
        id: 'usr-101',
        name: credentials.email ? credentials.email.split('@')[0] : 'Alex Rivera',
        email: credentials.email || 'alex.rivera@tasktracker.io',
        role: 'MANAGER',
      },
    };
  },

  /**
   * Mock register endpoint returning a dummy session
   */
  register: async (credentials: RegisterFormData): Promise<AuthSession> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      token: 'mock_jwt_token_development_mode',
      expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
      user: {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: credentials.name,
        email: credentials.email,
        role: 'MEMBER',
      },
    };
  },

  /**
   * Mock logout endpoint
   */
  logout: async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },

  /**
   * Mock current user endpoint
   */
  getCurrentUser: async (): Promise<AuthSession | null> => {
    if (typeof window !== 'undefined' && !localStorage.getItem('auth_token')) {
      return null;
    }

    return {
      token: 'mock_jwt_token_development_mode',
      expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
      user: {
        id: 'usr-101',
        name: 'Alex Rivera',
        email: 'alex.rivera@tasktracker.io',
        role: 'MANAGER',
      },
    };
  },
};
