import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { RequestConfig } from './types';
import { ENV } from '@/config/env';

/**
 * Creates an authenticated Server-Side Axios client with cookies from the incoming Next.js request.
 */
export async function createServerApiClient(): Promise<{
  get: <T>(url: string, config?: RequestConfig) => Promise<T>;
  post: <T>(url: string, data?: unknown, config?: RequestConfig) => Promise<T>;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  const instance: AxiosInstance = axios.create({
    baseURL: ENV.API_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return {
    get: async <T>(url: string, config?: RequestConfig): Promise<T> => {
      const response: AxiosResponse<T> = await instance.get(url, config);
      return response.data;
    },
    post: async <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> => {
      const response: AxiosResponse<T> = await instance.post(url, data, config);
      return response.data;
    },
  };
}
