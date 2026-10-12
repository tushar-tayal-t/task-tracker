'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/app.config';
import { NAVIGATION_LINKS } from '@/constants/app.constants';
import { Button } from '@/components/ui/button';
import {
  CheckSquare2,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
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
          <a
            href={APP_CONFIG.socials.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200"
          >
            <span>Docs</span>
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 sm:flex">
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
