'use client';

import React from 'react';
import { QueryProvider } from '@/lib/query/query-provider';
import { Toaster } from '@/components/ui/toaster';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      {children}
      <Toaster />
    </QueryProvider>
  );
}
