'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_CONFIG } from '@/config/app.config';
import { NAVIGATION_LINKS } from '@/constants/app.constants';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/modules/auth';
import { useWorkspacesQuery } from '@/modules/workspaces';
import { useTheme } from '@/providers/theme-provider';
import { getInitials, cn } from '@/lib/utils';
import {
  CheckSquare2,
  Menu,
  X,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  Sun,
  Moon,
} from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { data: workspaces = [] } = useWorkspacesQuery({
    enabled: isAuthenticated,
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href={APP_CONFIG.routes.home}
          className="group flex items-center gap-2.5 transition-transform hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900">
            <CheckSquare2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
                {APP_CONFIG.name}
              </span>
              <span className="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.2 text-[10px] font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-zinc-500">Agile Sprint OS</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAVIGATION_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-850 dark:hover:text-zinc-100'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 sm:flex">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer shadow-xs"
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {isLoading ? (
            <div className="h-9 w-28 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              {/* User Profile Badge */}
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-200 text-[11px] font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                  {getInitials(user.name)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 capitalize leading-none">
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Workspaces CTA */}
              <Link href={APP_CONFIG.routes.workspaces}>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<LayoutDashboard className="h-3.5 w-3.5" />}
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Workspaces
                </Button>
              </Link>

              {/* Sign Out */}
              <button
                type="button"
                onClick={() => logout()}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-rose-900 dark:hover:bg-rose-950 dark:hover:text-rose-400 cursor-pointer"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <>
              <Link href={APP_CONFIG.routes.login}>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href={APP_CONFIG.routes.login}>
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Open Workspace
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-1.5">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-2.5 px-2 py-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-200 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <Link href={APP_CONFIG.routes.workspaces} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full text-xs">
                      Go to Workspaces
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-xs text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href={APP_CONFIG.routes.login} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full text-xs">
                      Sign In
                    </Button>
                  </Link>
                  <Link href={APP_CONFIG.routes.login} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full text-xs">
                      Open Workspace
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
