import axios from 'axios';
import { ApiErrorResponse } from './types';

export class ApiError extends Error {
  public status: number;
  public data?: ApiErrorResponse;

  constructor(status: number, message: string, data?: ApiErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Standardizes any unknown thrown error (Axios, Network, Custom) into a user-friendly string.
 */
export function normalizeApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    if (data?.message) return data.message;
    if (data?.error) return data.error;

    switch (error.response?.status) {
      case 400:
        return 'Bad request. Please review the submitted details.';
      case 401:
        return 'Unauthorized. Invalid email or password.';
      case 403:
        return 'Forbidden. You do not have permission to access this resource.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'Conflict detected. The resource already exists.';
      case 422:
        return 'Validation error. Please check your form fields.';
      case 500:
        return 'Internal server error. Please try again shortly.';
      default:
        return error.message || 'A network error occurred. Please try again.';
    }
  }

  if (error instanceof ApiError) {
    return error.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}
