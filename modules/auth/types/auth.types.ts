import { UserSummary } from '@/types/common.types';
import { LoginFormData, RegisterFormData } from '../schemas/auth.schema';

export type { LoginFormData, RegisterFormData };

export type LoginCredentials = LoginFormData;
export type RegisterCredentials = RegisterFormData;

export interface AuthSession {
  user: UserSummary;
  token: string;
  expiresAt: string;
}

export interface AuthState {
  user: UserSummary | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
