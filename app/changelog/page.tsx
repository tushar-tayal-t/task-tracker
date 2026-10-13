import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import {
  Tag,
  GitCommit,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Paperclip,
  SunMoon,
  Filter,
} from 'lucide-react';

export const metadata = {
  title: 'Changelog - TaskTracker',
  description: 'Product releases, sprint updates, and new features shipped in TaskTracker.',
};

export default function ChangelogPage() {
  const releases = [
    {
      version: 'v2.4.0',
      date: 'Current Release',
      title: 'Workspace Channels, 1-on-1 Direct Messaging & Media File Uploads',
      badge: 'Major Release',
      description: 'Unified real-time team communication directly inside the workspace so contributors can discuss tasks and exchange project media without leaving their boards.',
      highlights: [
        'Added group channels (#general, #sprint-planning) with active online presence counters',
        'Added 1-on-1 direct messaging between workspace members with unread status',
        'Implemented media attachments: upload images, technical PDFs, and documents directly to chat threads',
        'Added left workspace sidebar with persistent side tabs (Overview, Task Tracker, Chats & Groups, Members)',
      ],
    },
    {
      version: 'v2.3.0',
      date: 'Sprint 23',
      title: 'Member Task Assignments & Priority Query Routing',
      badge: 'Feature',
      description: 'Streamlined task delegation and fast URL-based filtering for sprint standups.',
      highlights: [
        'New Create Task Modal with workspace member assignee selection, priority picker, and deadline settings',
        'URL query parameter filter routing: /tasks?priority=low, high, or urgent',
        'Member load indicator to balance sprint tasks evenly across developers and designers',
        'Instant live updates with optimistic TanStack Query cache invalidations',
      ],
    },
    {
      version: 'v2.2.0',
      date: 'Sprint 22',
      title: 'Adaptive Light & Dark Mode Engine',
      badge: 'Improvement',
      description: 'Engineered a modern, high-contrast design system that works seamlessly in light and dark environments.',
      highlights: [
        'Persistent theme switcher synced with localStorage and system OS preferences',
        'Tailwind v4 custom dark variant tokens with zero hydration flicker',
        'Refined micro-borders, clean typography, and elevated card elevations (Linear & Vercel design system)',
      ],
    },
    {
      version: 'v2.1.0',
      date: 'Sprint 21',
      title: 'Multi-Tenant Workspaces & Role-Based Access Control',
      badge: 'Core Architecture',
      description: 'Isolated organization environments with granular permission boundaries.',
      highlights: [
        'Switch between multiple customer or product workspaces with a single user account',
        'Workspace Owner, Admin, and Member permission tiers',
        'Dynamic workspace dashboard metrics showing completion rates, active tasks, and member counts',
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 text-center border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Sprint Product Changelog</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Shipped updates & release notes
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
              Follow our continuous sprint releases. Every new capability, performance enhancement, and workflow improvement documented in one place.
            </p>
          </div>
        </section>

        {/* Release Timeline */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-12">
            {releases.map((release, idx) => (
              <div
                key={release.version}
                className="relative border-l-2 border-zinc-200 pl-6 pb-2 dark:border-zinc-800 sm:pl-8"
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 ${
                  idx === 0
                    ? 'border-indigo-600 bg-white dark:border-indigo-400 dark:bg-zinc-950'
                    : 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950'
                }`} />

                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white">
                    {release.version}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {release.badge}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                    <Calendar className="h-3 w-3" />
                    {release.date}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {release.title}
                </h3>

                <p className="mt-2 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">
                  {release.description}
                </p>

                <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-850 dark:bg-zinc-900/40">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Highlights
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {release.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 text-center border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Want to see these features in action?
            </h2>
            <div className="mt-6 flex justify-center gap-3">
              <Link href={APP_CONFIG.routes.workspaces}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Open Workspace
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
