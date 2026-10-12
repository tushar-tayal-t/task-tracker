'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/app.config';
import { NAVIGATION_LINKS } from '@/constants/app.constants';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/modules/auth';
import { getInitials } from '@/lib/utils';
import {
  CheckSquare2,
  Menu,
  X,
  ArrowRight,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href={APP_CONFIG.routes.home}
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950/90 transition group-hover:bg-transparent">
              <CheckSquare2 className="h-5 w-5 text-indigo-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">
                {APP_CONFIG.name}
              </span>
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">Team Sprint OS</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAVIGATION_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          {isLoading ? (
            <div className="h-9 w-32 animate-pulse rounded-xl bg-zinc-800/60" />
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* User Profile Badge */}
              <div className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 backdrop-blur-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white shadow-sm">
                  {getInitials(user.name)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-zinc-200 leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-medium text-indigo-400 leading-none">
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Dashboard CTA */}
              <Link href={APP_CONFIG.routes.dashboard}>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<LayoutDashboard className="h-3.5 w-3.5" />}
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Dashboard
                </Button>
              </Link>

              {/* Sign Out */}
              <button
                type="button"
                onClick={() => logout()}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-400 transition hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 cursor-pointer"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Link href={APP_CONFIG.routes.login}>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href={APP_CONFIG.routes.dashboard}>
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

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-5 md:hidden">
          <div className="flex flex-col gap-2">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-2.5 pt-4 border-t border-zinc-800">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-200">
                        {user.name}
                      </span>
                      <span className="text-xs text-indigo-400">
                        {user.email} ({user.role})
                      </span>
                    </div>
                  </div>

                  <Link href={APP_CONFIG.routes.dashboard} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Go to Dashboard
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full border-zinc-800 text-rose-400 hover:border-rose-500/30"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href={APP_CONFIG.routes.login} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href={APP_CONFIG.routes.dashboard} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
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
