/**
 * Environment variables configuration and validation
 */

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
  API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;
