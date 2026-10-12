import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-2xl shadow-indigo-500/20">
        <FileQuestion className="h-10 w-10 animate-bounce" />
      </div>
      <span className="mt-6 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
        404 ERROR
      </span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-md text-sm text-zinc-400">
        The page or resource you are looking for does not exist or has been moved to another location.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button variant="primary" leftIcon={<Home className="h-4 w-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
