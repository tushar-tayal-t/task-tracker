import React from 'react';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { HeroActions } from '@/components/layouts/hero-actions';
import {
  CheckCircle2,
  Zap,
  Users2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Kanban,
  FileText,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/app.config';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1">
        {/* Clean, Modern Hero Section */}
        <section className="relative px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 shadow-xs transition dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Modern Team Task Management & Collaboration</span>
            </div>

            {/* Headline */}
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl sm:leading-[1.1] dark:text-white">
              Organize sprint tasks.{' '}
              <span className="text-zinc-500 dark:text-zinc-400">
                Ship software faster.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
              A high-performance workspace built for agile engineering teams. Assign tasks by priority, coordinate in real-time group chats, share documents, and track member delivery without overhead.
            </p>

            {/* Call to Actions */}
            <HeroActions />

            {/* Trust checklist */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Zero complex setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Task assignment with priorities</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Integrated channels & DMs</span>
              </div>
            </div>
          </div>

          {/* Interactive Workspace Mock Preview */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/50 p-2 shadow-xl shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/40 dark:shadow-none">
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
                {/* Mock Window Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/60">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-400/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                      Acme Engineering Workspace / Sprint 24
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[11px] dark:border-zinc-700 dark:bg-zinc-800">
                      v2.4.0
                    </span>
                  </div>
                </div>

                {/* Mock Board Content */}
                <div className="grid grid-cols-1 divide-y divide-zinc-100 p-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-zinc-800/60">
                  {/* Column 1: In Progress */}
                  <div className="p-3">
                    <div className="mb-3 flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <span>In Progress</span>
                      </div>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">2</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center justify-between">
                          <span className="rounded border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                            Urgent
                          </span>
                          <span className="text-[11px] text-zinc-400">#TSK-104</span>
                        </div>
                        <h4 className="mt-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          Fix Auth Token Refresh Race Condition
                        </h4>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Today
                          </span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                            TT
                          </span>
                        </div>
                      </div>

                      <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center justify-between">
                          <span className="rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                            High
                          </span>
                          <span className="text-[11px] text-zinc-400">#TSK-108</span>
                        </div>
                        <h4 className="mt-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          Add Channel File Upload & Media Preview
                        </h4>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" /> 2 attachments
                          </span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                            SC
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: In Review */}
                  <div className="p-3">
                    <div className="mb-3 flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                        <span>In Review</span>
                      </div>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">1</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center justify-between">
                          <span className="rounded border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                            Medium
                          </span>
                          <span className="text-[11px] text-zinc-400">#TSK-112</span>
                        </div>
                        <h4 className="mt-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          Unified Left Sidebar with Dark / Light Switch
                        </h4>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                            Ready to merge
                          </span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                            MR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Completed */}
                  <div className="p-3">
                    <div className="mb-3 flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Done (This Sprint)</span>
                      </div>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">8</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-3 shadow-xs dark:border-zinc-800/60 dark:bg-zinc-900/40 opacity-80">
                        <div className="flex items-center justify-between">
                          <span className="rounded border border-zinc-300 bg-zinc-200/50 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                            Low
                          </span>
                          <span className="text-[11px] text-zinc-400">#TSK-099</span>
                        </div>
                        <h4 className="mt-2 text-xs font-medium text-zinc-600 line-through dark:text-zinc-400">
                          Clean up legacy mock stores and routing
                        </h4>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Completed</span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                            EM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Core Highlight Cards */}
          <div className="mx-auto mt-20 max-w-5xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
              <Link href={APP_CONFIG.routes.features} className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 group-hover:scale-105 transition-transform">
                  <Kanban className="h-5 w-5" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                    Sprint Task Tracker
                  </h2>
                  <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">
                  Filter by priority (Urgent, High, Low), track statuses, and assign directly to workspace team members with due dates.
                </p>
              </Link>

              <Link href={APP_CONFIG.routes.features} className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 group-hover:scale-105 transition-transform">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                    Channels & Direct Chats
                  </h2>
                  <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">
                  Built-in group channels and 1-on-1 team direct messages with file attachments and media sharing built right in.
                </p>
              </Link>

              <Link href={APP_CONFIG.routes.features} className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 group-hover:scale-105 transition-transform">
                  <Users2 className="h-5 w-5" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                    Workspace Members
                  </h2>
                  <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">
                  Role-based membership (Owner, Admin, Member) to organize cross-functional teams and streamline accountability.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
