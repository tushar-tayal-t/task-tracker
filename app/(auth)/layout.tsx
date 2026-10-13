import React from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/app.config';
import { CheckSquare2, ArrowLeft } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      {/* Header bar */}
      <header className="relative z-10 flex h-16 w-full items-center justify-between border-b border-zinc-200/80 bg-white/80 px-6 backdrop-blur-md sm:px-10 dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <Link
          href={APP_CONFIG.routes.home}
          className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <Link href={APP_CONFIG.routes.home} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
            <CheckSquare2 className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
            {APP_CONFIG.name}
          </span>
        </Link>
      </header>

      {/* Main Auth Container */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-zinc-500 dark:text-zinc-500 border-t border-zinc-200/60 dark:border-zinc-800/60">
        &copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
      </footer>
    </div>
  );
}
