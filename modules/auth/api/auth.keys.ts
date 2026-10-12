/**
 * Query & Mutation Keys for Authentication
 */
export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  userProfile: () => [...authKeys.all, 'profile'] as const,
} as const;
