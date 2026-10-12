'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400 shadow-xl shadow-rose-500/10">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Something unexpected occurred
      </h2>
      <p className="mt-2 max-w-md text-sm text-zinc-400">
        {'An error occurred while loading this view. You can retry or head back home.'}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={() => reset()}
          variant="primary"
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" leftIcon={<Home className="h-4 w-4" />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
