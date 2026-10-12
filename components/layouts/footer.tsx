import React from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/app.config';
import { CheckSquare2, Code2, Globe, Layers, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950">
                  <CheckSquare2 className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                {APP_CONFIG.name}
              </span>
            </div>
            <p className="max-w-sm text-sm text-zinc-400 leading-relaxed">
              High-performance agile task tracking with feature modules, granular role-based access, and enterprise workflow visibility.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={APP_CONFIG.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
                aria-label="GitHub Repository"
              >
                <Code2 className="h-4 w-4" />
              </a>
              <a
                href={APP_CONFIG.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
                aria-label="Twitter Profile"
              >
                <Globe className="h-4 w-4" />
              </a>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </div>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={APP_CONFIG.routes.dashboard} className="hover:text-white transition">
                  Live Dashboard
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.tasks} className="hover:text-white transition">
                  Sprint Boards
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.projects} className="hover:text-white transition">
                  Project Roadmaps
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.users} className="hover:text-white transition">
                  Team Members
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Architecture
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-indigo-400" />
                <span>Modular Architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                <span>RBAC & Permissions</span>
              </li>
              <li>
                <span className="text-zinc-500">Zustand & TanStack Query</span>
              </li>
              <li>
                <span className="text-zinc-500">App Router v16</span>
              </li>
            </ul>
          </div>

          {/* Auth & Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Access
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={APP_CONFIG.routes.login} className="hover:text-white transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.register} className="hover:text-white transition">
                  Register Account
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.forgotPassword} className="hover:text-white transition">
                  Reset Password
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.health} className="hover:text-white transition">
                  API Status (/health)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} {APP_CONFIG.name}. Built with Next.js App Router and Modular Architecture.
          </p>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <span>Engineered with passion</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
            <span>for high scale teams</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
