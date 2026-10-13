'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/modules/auth';
import { useWorkspacesQuery } from '@/modules/workspaces';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import { ArrowRight, LayoutDashboard, UserCheck } from 'lucide-react';

export function HeroActions() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { data: workspaces = [] } = useWorkspacesQuery({
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return (
      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="h-11 w-44 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-11 w-32 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-850" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3">
        {/* User Status Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 dark:text-emerald-400">
          <UserCheck className="h-3.5 w-3.5" />
          <span>Signed in as <strong>{user.name}</strong> ({user.role})</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href={APP_CONFIG.routes.workspaces}>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<LayoutDashboard className="h-4 w-4" />}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="font-medium px-6 text-sm"
            >
              {workspaces.length > 0 ? `Go to Workspaces (${workspaces.length})` : 'Select Workspace'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <Link href={APP_CONFIG.routes.login}>
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="font-medium px-6 text-sm"
        >
          Sign In to Workspace
        </Button>
      </Link>

      <Link href={APP_CONFIG.routes.register}>
        <Button
          variant="outline"
          size="lg"
          className="font-medium px-6 text-sm"
        >
          Create Account
        </Button>
      </Link>
    </div>
  );
}
