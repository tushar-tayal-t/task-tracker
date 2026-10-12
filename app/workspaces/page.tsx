'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/modules/auth';
import { useWorkspacesQuery, WorkspaceCard, CreateWorkspaceModal } from '@/modules/workspaces';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import { getInitials } from '@/lib/utils';
import {
  CheckSquare2,
  Plus,
  Search,
  LogOut,
  Briefcase,
  Sparkles,
} from 'lucide-react';

export default function WorkspacesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const {
    data: workspaces = [],
    isLoading: workspacesLoading,
    isFetching: workspacesFetching,
  } = useWorkspacesQuery({
    enabled: !authLoading && isAuthenticated,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(APP_CONFIG.routes.login);
    }
  }, [authLoading, isAuthenticated, router]);

  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ws.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-xs">Checking session credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href={APP_CONFIG.routes.home} className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950">
                <CheckSquare2 className="h-4 w-4 text-indigo-400" />
              </div>
            </div>
            <span className="text-base font-bold text-white">{APP_CONFIG.name}</span>
          </Link>

          {/* User & Logout */}
          {user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-[10px] font-bold text-white">
                  {getInitials(user.name)}
                </div>
                <span className="text-xs font-semibold text-zinc-300">{user.name}</span>
              </div>

              <button
                type="button"
                onClick={() => logout()}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Multi-Tenant Sprints</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Select Workspace
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Choose a workspace to launch your team sprints and project boards
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="glow"
              size="md"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Create Workspace
            </Button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="my-8 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search workspaces by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            {workspacesFetching && !workspacesLoading && (
              <span className="flex items-center gap-1.5 text-[11px] text-indigo-400 font-medium">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-indigo-400" />
                Syncing...
              </span>
            )}
            <span className="text-xs text-zinc-500 font-mono">
              {filteredWorkspaces.length} workspace{filteredWorkspaces.length === 1 ? '' : 's'} available
            </span>
          </div>
        </div>

        {/* Workspaces Grid */}
        {workspacesLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 animate-pulse" />
            ))}
          </div>
        ) : filteredWorkspaces.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-zinc-600" />
            <h3 className="mt-3 text-base font-semibold text-zinc-300">No workspaces found</h3>
            <p className="mt-1 text-xs text-zinc-500">
              {searchQuery ? 'Try clearing your search query.' : 'Create your first workspace to start collaborating.'}
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="sm"
              className="mt-5"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Create New Workspace
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkspaces.map((ws) => (
              <WorkspaceCard key={ws.id} workspace={ws} />
            ))}
          </div>
        )}
      </main>

      {/* Create Workspace Modal */}
      <CreateWorkspaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
