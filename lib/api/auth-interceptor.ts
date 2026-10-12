import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { RequestConfig } from './types';

export function setupAuthInterceptor(axiosInstance: AxiosInstance): void {
  // Request Interceptor: Attach Bearer token
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig & RequestConfig) => {
      if (config.skipAuth) {
        return config;
      }

      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Handle 401s, Token Refresh, or Logout
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as RequestConfig | undefined;

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        if (typeof window !== 'undefined') {
          // Token expired or invalid
          localStorage.removeItem('auth_token');
          // In production: perform silent refresh token call or redirect to login
        }
      }

      return Promise.reject(error);
    }
  );
}
