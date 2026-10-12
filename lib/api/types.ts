import type { AxiosRequestConfig } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  _retry?: boolean;
}

export interface ApiErrorResponse {
  message?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
  error?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
