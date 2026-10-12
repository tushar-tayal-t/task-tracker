'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/modules/auth';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import { ArrowRight, LayoutDashboard, UserCheck } from 'lucide-react';

export function HeroActions() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="h-12 w-48 animate-pulse rounded-xl bg-zinc-800/60" />
        <div className="h-12 w-36 animate-pulse rounded-xl bg-zinc-800/40" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="mt-10 flex flex-col items-center gap-3">
        {/* User Status Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
          <UserCheck className="h-3.5 w-3.5" />
          <span>Signed in as <strong className="text-white">{user.name}</strong> ({user.role})</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href={APP_CONFIG.routes.workspaces}>
            <Button
              variant="glow"
              size="lg"
              leftIcon={<LayoutDashboard className="h-4 w-4" />}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="font-semibold px-8"
            >
              Select Workspace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      <Link href={APP_CONFIG.routes.login}>
        <Button
          variant="glow"
          size="lg"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="font-semibold px-8"
        >
          Sign In to Workspace
        </Button>
      </Link>

      <Link href={APP_CONFIG.routes.register}>
        <Button
          variant="outline"
          size="lg"
          className="border-zinc-800 hover:border-zinc-700 text-zinc-300"
        >
          Create Account
        </Button>
      </Link>
    </div>
  );
}
