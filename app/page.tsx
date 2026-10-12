import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { TaskPreviewBoard } from '@/modules/tasks';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Zap,
  Layers,
  BarChart3,
  Users2,
  Lock,
  GitBranch,
  Gauge,
  Sparkles,
  ChevronRight,
  Workflow,
  CheckCheck,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pb-36"
        >
          {/* Ambient Glows */}
          <div className="ambient-glow -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-indigo-600/20" />
          <div className="ambient-glow top-40 right-[-100px] h-[350px] w-[350px] bg-purple-600/15" />
          <div className="ambient-glow top-80 left-[-100px] h-[350px] w-[350px] bg-pink-600/10" />

          {/* Grid pattern background */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#18181b1a_1px,transparent_1px),linear-gradient(to_bottom,#18181b1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              {/* Release Tag */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-inner backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                <span>TaskTracker 1.0 Enterprise Architecture</span>
                <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />
              </div>

              {/* Main Headline */}
              <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Engineered for{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  Velocity.
                </span>{' '}
                Built for Scalable Teams.
              </h1>

              {/* Subheadline */}
              <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-400 max-w-2xl mx-auto">
                Unify sprint backlogs, project roadmaps, granular RBAC permissions, and team telemetry in a high-concurrency modular application.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href={APP_CONFIG.routes.register} id="cta-get-started">
                  <Button
                    variant="glow"
                    size="lg"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="font-semibold px-8 shadow-xl shadow-indigo-600/25"
                  >
                    Start Free Trial
                  </Button>
                </Link>

                <a href="#live-demo" id="cta-explore-demo">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Sparkles className="h-4 w-4 text-indigo-400" />}
                    className="border-zinc-700 hover:border-zinc-500"
                  >
                    Try Interactive Demo
                  </Button>
                </a>
              </div>

              {/* Trust & Architecture Badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Role-Based Access (RBAC)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-indigo-400" />
                  <span>Domain Feature Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span>TanStack Query v5 Caching</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-sky-400" />
                  <span>Next.js App Router</span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* LIVE INTERACTIVE DEMO WIDGET */}
            {/* ========================================================================= */}
            <div id="live-demo" className="mt-16 sm:mt-24 scroll-mt-24">
              <div className="relative mx-auto max-w-5xl">
                {/* Glowing border ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/30 opacity-70 blur-xl" />

                <div className="relative">
                  {/* Demo Widget Header */}
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                        <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                        <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-xs font-mono text-zinc-400 ml-2">
                        workspace://task-tracker/sprint-live-preview
                      </span>
                    </div>
                    <span className="text-xs text-indigo-400 font-medium mt-1 sm:mt-0">
                      ⚡ Fully interactive — try checking a task or creating one below!
                    </span>
                  </div>

                  {/* The Interactive Board */}
                  <TaskPreviewBoard />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STATS / IMPACT COUNTER SECTION */}
        {/* ========================================================================= */}
        <section className="border-y border-zinc-800/80 bg-zinc-950/60 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  250K+
                </p>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-medium">
                  Tasks Tracked Monthly
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">
                  99.99%
                </p>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-medium">
                  Guaranteed SLA Uptime
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
                  &lt; 35ms
                </p>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-medium">
                  Average Query Latency
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-purple-400 tracking-tight">
                  100%
                </p>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-medium">
                  Type-Safe Modular Isolation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MODULAR ARCHITECTURE SHOWCASE */}
        {/* ========================================================================= */}
        <section id="architecture" className="py-24 sm:py-32 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300">
                ARCHITECTURE BLUEPRINT
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Engineered Around Strict Domain Isolation
              </h2>
              <p className="mt-4 text-base text-zinc-400">
                Every business capability is partitioned into dedicated domain modules. No tangled spaghetti dependencies. Built for extreme scale and developer velocity.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Layer 1: app/ */}
              <div className="glass-card rounded-2xl p-6 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  app/ Next.js App Router
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Clear separation between public <code className="text-indigo-300">(auth)</code> and authenticated <code className="text-indigo-300">(dashboard)</code> route groups with layouts and streaming states.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-400">
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">/tasks</span>
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">/projects</span>
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">/users</span>
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">/settings</span>
                </div>
              </div>

              {/* Layer 2: modules/ */}
              <div className="glass-card rounded-2xl p-6 transition-all border-indigo-500/30 bg-indigo-950/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <GitBranch className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  modules/ Feature Modules
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Feature-first encapsulation. Each domain (auth, tasks, projects, users, roles, reports) encapsulates its own api, components, hooks, schemas, and types.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-400">
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">tasks</span>
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">projects</span>
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">auth</span>
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">roles</span>
                </div>
              </div>

              {/* Layer 3: components/ & lib/ */}
              <div className="glass-card rounded-2xl p-6 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                  <Gauge className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  lib/ & components/ Shared Core
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Shared technical infrastructure: TanStack React Query clients, error normalization, Zustand stores, and atomic reusable UI primitives.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-400">
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">query-client</span>
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">ui.store</span>
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5">button.tsx</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CORE FEATURES GRID */}
        {/* ========================================================================= */}
        <section id="features" className="py-24 sm:py-32 bg-zinc-950/40 border-t border-zinc-900 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
                POWERFUL FEATURES
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything Modern Teams Need to Deliver
              </h2>
              <p className="mt-4 text-base text-zinc-400">
                From daily standups to multi-quarter releases, orchestrate work with total clarity.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="glass-card rounded-2xl p-6 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Workflow className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Sprint & Kanban Boards
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Fluid status transitions (To Do, In Progress, In Review, Done) with real-time optimistic UI updates and instant team visibility.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card rounded-2xl p-6 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Granular RBAC Security
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Role-based authorizations across Admins, Project Managers, Members, and External Stakeholders with strict boundary policies.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card rounded-2xl p-6 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Burn-Down & Velocity Reports
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Monitor cycle time, sprint velocity, completion curves, and team throughput with automated telemetry reports.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card rounded-2xl p-6 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  TanStack Query Sync
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Automatic background revalidation, stale cache management, and smart mutations ensure zero stale state across tabs.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-card rounded-2xl p-6 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                  <Users2 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Team & Assignee Allocation
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Prevent developer burnout with workload balancing, assignee tags, avatar badges, and instant sprint capacity estimates.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-card rounded-2xl p-6 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                  <CheckCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Automated Audit Logging
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Complete historic trace of task movements, permission updates, assignment changes, and release deployments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WORKFLOW / HOW IT WORKS */}
        {/* ========================================================================= */}
        <section id="workflow" className="py-24 sm:py-32 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                END-TO-END WORKFLOW
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                From Sprint Planning to Confident Shipping
              </h2>
              <p className="mt-4 text-base text-zinc-400">
                A structured four-phase pipeline designed for modern agile software development teams.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: '01',
                  title: 'Plan & Backlog',
                  desc: 'Create projects, outline milestones, and define user stories with estimated hours.',
                },
                {
                  step: '02',
                  title: 'Assign & Authorize',
                  desc: 'Assign engineers with automatic RBAC policy validation and team workload balancing.',
                },
                {
                  step: '03',
                  title: 'Track & Iterate',
                  desc: 'Move cards through real-time kanban columns with optimistic state updates.',
                },
                {
                  step: '04',
                  title: 'Deliver & Analyze',
                  desc: 'Tag releases, verify completed acceptance criteria, and inspect burndown velocity.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm"
                >
                  <span className="text-3xl font-black text-indigo-500/40 font-mono">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CALL TO ACTION (CTA) SECTION */}
        {/* ========================================================================= */}
        <section id="cta" className="relative py-20 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/60 via-zinc-950 to-zinc-950 p-8 sm:p-14 text-center shadow-2xl overflow-hidden">
              <div className="ambient-glow -top-32 left-1/2 -translate-x-1/2 h-[300px] w-[500px] bg-indigo-500/30" />

              <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Ready to Accelerate Your Sprint Delivery?
              </h2>
              <p className="relative mt-4 max-w-xl mx-auto text-base text-zinc-300">
                Experience high-velocity task tracking with full domain modularity and enterprise RBAC out of the box.
              </p>

              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href={APP_CONFIG.routes.register}>
                  <Button
                    variant="glow"
                    size="lg"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="px-8 font-semibold shadow-lg shadow-purple-600/30"
                  >
                    Create Free Workspace
                  </Button>
                </Link>
                <Link href={APP_CONFIG.routes.login}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-zinc-700 hover:border-zinc-500"
                  >
                    Sign In to Existing Account
                  </Button>
                </Link>
              </div>

              <div className="relative mt-8 flex items-center justify-center gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Full architecture included</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
