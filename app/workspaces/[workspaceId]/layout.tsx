'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/modules/auth';
import { useWorkspaceDetailQuery, useWorkspaceStore } from '@/modules/workspaces';
import { useTheme } from '@/providers/theme-provider';
import { APP_CONFIG } from '@/config/app.config';
import { getInitials } from '@/lib/utils';
import {
  Briefcase,
  CheckSquare2,
  Users,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X,
  ChevronsUpDown,
} from 'lucide-react';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const setActiveWorkspace = useWorkspaceStore((state) => state.setActiveWorkspace);
  const { resolvedTheme, toggleTheme } = useTheme();

  // URL-driven workspace query
  const {
    data: workspace,
    isLoading: workspaceLoading,
    isFetching: workspaceFetching,
  } = useWorkspaceDetailQuery(workspaceId, {
    enabled: Boolean(workspaceId) && !authLoading && isAuthenticated,
  });

  // Sync in-memory store
  useEffect(() => {
    if (workspace) {
      setActiveWorkspace(workspace);
    }
  }, [workspace, setActiveWorkspace]);

  // Auth Guard
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(APP_CONFIG.routes.login);
    }
  }, [authLoading, isAuthenticated, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    {
      label: 'Overview',
      href: `/workspaces/${workspaceId}`,
      icon: LayoutDashboard,
      active: pathname === `/workspaces/${workspaceId}`,
    },
    {
      label: 'Task Tracker',
      href: `/workspaces/${workspaceId}/tasks`,
      icon: CheckSquare2,
      active: pathname.startsWith(`/workspaces/${workspaceId}/tasks`),
      badge: workspace?.taskCount ? String(workspace.taskCount) : undefined,
    },
    {
      label: 'Chats & Groups',
      href: `/workspaces/${workspaceId}/chat`,
      icon: MessageSquare,
      active: pathname.startsWith(`/workspaces/${workspaceId}/chat`),
      badge: 'Live',
    },
    {
      label: 'Members',
      href: `/workspaces/${workspaceId}/members`,
      icon: Users,
      active: pathname === `/workspaces/${workspaceId}/members`,
      badge: workspace?.memberCount ? String(workspace.memberCount) : undefined,
    },
  ];

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-white dark:border-t-transparent" />
          <p className="text-xs font-mono">Authenticating session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Backdrop for Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Side Tabs (Left Sidebar) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-200 bg-zinc-50/90 dark:border-zinc-800 dark:bg-zinc-950 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Workspace Switcher Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
          <Link
            href={APP_CONFIG.routes.workspaces}
            className="group flex flex-1 items-center gap-2.5 rounded-xl p-1.5 hover:bg-zinc-200/60 dark:hover:bg-zinc-900 transition truncate"
            title="Switch Workspace"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-xs shadow-xs">
              <Briefcase className="h-4 w-4" />
            </div>

            <div className="flex flex-1 flex-col truncate text-left">
              <span className="text-xs font-bold text-zinc-900 dark:text-white truncate leading-tight">
                {workspace?.name || (workspaceLoading ? 'Loading...' : workspaceId)}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono leading-tight">
                {workspace?.role || 'MEMBER'} &bull; {workspace?.plan || 'PRO'}
              </span>
            </div>

            <ChevronsUpDown className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 shrink-0" />
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden ml-1 p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Side Tabs Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          <div className="space-y-1">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Workspace
            </span>

            <div className="mt-2 space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.href} className="space-y-0.5">
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition ${item.active
                          ? 'bg-zinc-200/80 text-zinc-900 dark:bg-zinc-800 dark:text-white font-semibold'
                          : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200'
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 ${item.active ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`rounded-md px-1.5 py-0.2 text-[10px] font-mono ${item.active
                              ? 'bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-200'
                              : 'bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                            }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sidebar Footer: Theme Toggle & User Info */}
        <div className="border-t border-zinc-200 p-3 dark:border-zinc-800 space-y-2">
          {/* Light / Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {resolvedTheme === 'dark' ? (
                <Moon className="h-3.5 w-3.5 text-zinc-400" />
              ) : (
                <Sun className="h-3.5 w-3.5 text-amber-500" />
              )}
              <span className="text-[11px] font-medium">
                {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">Toggle</span>
          </button>

          {/* User Row & Logout */}
          {user && (
            <div className="flex items-center justify-between rounded-lg p-1.5">
              <div className="flex items-center gap-2 truncate">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-200 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white text-xs font-bold">
                  {getInitials(user.name)}
                </div>
                <div className="flex flex-col truncate text-left">
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono leading-tight">
                    {user.role}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => logout()}
                className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition cursor-pointer"
                title="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Slim Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200 bg-white/80 px-4 sm:px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {workspace?.name || workspaceId}
              </span>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="text-zinc-900 dark:text-white font-semibold">
                {pathname.includes('/tasks')
                  ? 'Task Tracker'
                  : pathname.includes('/chat')
                    ? 'Chats & Groups'
                    : pathname.includes('/members')
                      ? 'Members'
                      : 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live sync pill */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{workspaceFetching ? 'Syncing...' : 'Synced'}</span>
            </div>
          </div>
        </header>

        {/* Page Content Slot */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
