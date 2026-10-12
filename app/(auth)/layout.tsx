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
    <div className="relative flex min-h-screen flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="ambient-glow -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[600px] bg-indigo-600/15" />
      <div className="ambient-glow bottom-0 right-0 h-[300px] w-[300px] bg-purple-600/10" />

      {/* Header bar */}
      <header className="relative z-10 flex h-16 w-full items-center justify-between px-6 sm:px-10">
        <Link
          href={APP_CONFIG.routes.home}
          className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors text-xs font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <Link href={APP_CONFIG.routes.home} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-zinc-950">
              <CheckSquare2 className="h-4 w-4 text-indigo-400" />
            </div>
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
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
      <footer className="relative z-10 py-4 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
      </footer>
    </div>
  );
}
