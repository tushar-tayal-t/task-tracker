import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { setupAuthInterceptor } from './auth-interceptor';
import { RequestConfig } from './types';
import { ENV } from '@/config/env';

export class HttpClient {
  public readonly instance: AxiosInstance;

  constructor(baseURL: string = ENV.API_URL) {
    this.instance = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    setupAuthInterceptor(this.instance);
  }

  public async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.patch(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }
}

/**
 * Singleton browser HTTP client
 */
export const apiClient = new HttpClient();
