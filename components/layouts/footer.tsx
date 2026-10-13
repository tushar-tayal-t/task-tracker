'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/app.config';
import { toast } from 'sonner';
import {
  CheckSquare2,
  Code2,
  Globe,
  Layers,
  ShieldCheck,
  Heart,
  ArrowRight,
  Send,
  Zap,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid work email.');
      return;
    }
    setSubscribed(true);
    toast.success('Subscribed! You will receive new sprint release notes.');
    setEmail('');
  };

  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50 text-zinc-600 transition-colors dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top Newsletter & Subscription Row */}
        <div className="pb-12 border-b border-zinc-200/80 dark:border-zinc-850 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Stay in the loop with sprint updates
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
              Get notified when we ship new features, priority filters, channel integrations, and velocity enhancements. No spam, ever.
            </p>
          </div>
          <div className="md:col-span-5">
            {subscribed ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ Subscribed to engineering changelog
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="pt-12 grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900">
                <CheckSquare2 className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                {APP_CONFIG.name}
              </span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              The high-velocity Team Sprint OS for engineering squads. Prioritize backlog issues, assign team members, and collaborate in real-time channels with media attachments.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={APP_CONFIG.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                aria-label="GitHub Repository"
              >
                <Code2 className="h-4 w-4" />
              </a>
              <a
                href={APP_CONFIG.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                aria-label="Twitter Profile"
              >
                <Globe className="h-4 w-4" />
              </a>
              <Link
                href="/api/health"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 hover:bg-emerald-500/20 transition dark:text-emerald-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                API Healthy
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={APP_CONFIG.routes.features} className="hover:text-zinc-900 dark:hover:text-white transition">
                  Features Overview
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.pricing} className="hover:text-zinc-900 dark:hover:text-white transition">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.changelog} className="hover:text-zinc-900 dark:hover:text-white transition">
                  Product Changelog
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.workspaces} className="hover:text-zinc-900 dark:hover:text-white transition">
                  Sprint Workspaces
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={APP_CONFIG.routes.about} className="hover:text-zinc-900 dark:hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={APP_CONFIG.routes.contact} className="hover:text-zinc-900 dark:hover:text-white transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <a href={APP_CONFIG.socials.github} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition">
                  Open Source
                </a>
              </li>
              <li>
                <span className="text-zinc-400 dark:text-zinc-500 cursor-not-allowed">
                  Careers (Hiring)
                </span>
              </li>
            </ul>
          </div>

          {/* Platform & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-indigo-500" />
                <span>Feature Modules</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-indigo-500" />
                <span>Role-Based RBAC</span>
              </li>
              <li>
                <span className="text-zinc-500">TanStack Cache v5</span>
              </li>
              <li>
                <span className="text-zinc-500">Zustand State Store</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row dark:border-zinc-800">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} {APP_CONFIG.name}. Modern Agile Task Orchestration.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <Link href={APP_CONFIG.routes.contact} className="hover:text-zinc-700 dark:hover:text-zinc-300">
              Security
            </Link>
            <Link href={APP_CONFIG.routes.about} className="hover:text-zinc-700 dark:hover:text-zinc-300">
              Privacy
            </Link>
            <div className="flex items-center gap-1">
              <span>Crafted for high-velocity teams</span>
              <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
