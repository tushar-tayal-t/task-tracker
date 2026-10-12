import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center">
        {/* Simple & Focused Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          {/* Subtle Ambient Glow */}
          <div className="ambient-glow -top-32 left-1/2 -translate-x-1/2 h-[450px] w-[650px] bg-indigo-600/15" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Simple, Scalable Task Management</span>
            </div>

            {/* Headline */}
            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Organize your tasks.{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Ship faster.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-400 max-w-2xl mx-auto">
              A high-performance task tracking platform built for teams to manage sprint backlogs, assign responsibilities, and hit deadlines without friction.
            </p>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href={APP_CONFIG.routes.login}>
                <Button
                  variant="glow"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="font-semibold px-8"
                >
                  Sign In to Workspace
                </Button>
              </Link>

              <Link href={APP_CONFIG.routes.register}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-zinc-800 hover:border-zinc-700 text-zinc-300"
                >
                  Create Account
                </Button>
              </Link>
            </div>

            {/* 3 Core Highlight Cards */}
            <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-white">
                  Sprint Velocity
                </h2>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Fast, intuitive task boards with clear status tracking and priorities to keep your team aligned.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-white">
                  Role-Based Control
                </h2>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Enterprise-ready access permissions for admins, managers, and contributors across projects.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-white">
                  Team Insights
                </h2>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Track completion rates, cycle times, and sprint capacity with real-time analytics.
                </p>
              </div>
            </div>

            {/* Quick trust checkmarks */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Zero setup required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Free for personal projects</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Modern React & Next.js stack</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
