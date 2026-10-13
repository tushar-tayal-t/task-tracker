import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import {
  Code2,
  Users2,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const metadata = {
  title: 'About Us - TaskTracker',
  description: 'Our mission: Eliminate sprint friction and bring task planning and team conversations into one lightning-fast workspace.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Zero Bloat, Zero Lag',
      desc: 'Issue trackers should feel as fast as a text editor. We strip out unnecessary enterprise bureaucracy to keep keyboard-friendly speed at the core.',
      icon: Zap,
    },
    {
      title: 'Context-Aware Collaboration',
      desc: 'A task is meaningless without the discussion behind it. Group channels and 1-on-1 team direct messages live directly adjacent to sprint boards.',
      icon: Users2,
    },
    {
      title: 'Transparency & Architecture',
      desc: 'Built on a clean modular architecture, strictly typed with TypeScript, TanStack Query for caching, and Zustand for responsive local state.',
      icon: Cpu,
    },
    {
      title: 'Security & Access Control',
      desc: 'Workspaces isolate teams, tasks, and file attachments securely with role-based access control (RBAC).',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1">
        {/* Mission Hero */}
        <section className="px-4 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:px-8 text-center border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Target className="h-3.5 w-3.5 text-indigo-500" />
              <span>Our Mission</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Built by engineers who were tired of bloated issue trackers
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
              Modern software teams waste up to 40% of their sprint time context-switching between slow project management software, disconnected messaging apps, and lost email threads. We built <strong>TaskTracker</strong> to put tasks, priorities, and team chats in one unified workspace.
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tight text-center text-zinc-900 dark:text-white">
              The Principles That Guide Us
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-zinc-600 dark:text-zinc-400">
              Every feature we build must pass this litmus test: does it help engineers ship faster?
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tech Stack Specs */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Under the Hood: Enterprise Modern Stack
              </h2>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                Crafted with modular architecture separating concerns across feature domains:
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="font-mono text-xs font-semibold text-zinc-900 dark:text-white">Next.js 16</div>
                  <div className="text-[11px] text-zinc-500 mt-1">Turbopack & App Router</div>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="font-mono text-xs font-semibold text-zinc-900 dark:text-white">TanStack Query</div>
                  <div className="text-[11px] text-zinc-500 mt-1">Client cache & deduping</div>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="font-mono text-xs font-semibold text-zinc-900 dark:text-white">Zustand Stores</div>
                  <div className="text-[11px] text-zinc-500 mt-1">Zero-boilerplate state</div>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="font-mono text-xs font-semibold text-zinc-900 dark:text-white">Tailwind v4</div>
                  <div className="text-[11px] text-zinc-500 mt-1">Dark mode design tokens</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 text-center border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Experience the difference yourself
            </h2>
            <div className="mt-6 flex justify-center gap-3">
              <Link href={APP_CONFIG.routes.workspaces}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Launch Workspace
                </Button>
              </Link>
              <Link href={APP_CONFIG.routes.contact}>
                <Button variant="outline" size="lg">
                  Contact Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
