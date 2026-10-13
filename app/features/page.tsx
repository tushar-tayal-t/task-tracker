import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import {
  Kanban,
  MessageSquare,
  Users2,
  Zap,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  Layers,
  Paperclip,
  Share2,
} from 'lucide-react';
import { LazyText3D } from '@/components/ui/lazy-text-3d';

export const metadata = {
  title: 'Features - TaskTracker Team Sprint OS',
  description: 'Explore the full feature suite of TaskTracker: priority sprint boards, integrated team channels, direct chats with file sharing, and workspace RBAC.',
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-zinc-200/80 px-4 py-16 sm:px-6 sm:py-24 dark:border-zinc-800/80">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Full Product Capabilities</span>
            </div>

            <div className="mt-6 flex justify-center py-2">
              <h1 className="sr-only">TaskTracker Sprint OS</h1>
              <LazyText3D
                text="Sprint Engine"
                size="xl"
                layersCount={28}
                spacing={1.4}
                showBadge={true}
                interactive={true}
                fallbackClassName="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white"
              />
            </div>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
              TaskTracker combines agile sprint backlogs, task assignment by priority, and team chat channels with media sharing into one frictionless workspace.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={APP_CONFIG.routes.workspaces}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Explore Workspaces
                </Button>
              </Link>
              <Link href={APP_CONFIG.routes.pricing}>
                <Button variant="outline" size="lg">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature 1: Sprint Task Management */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Kanban className="h-4 w-4" />
                <span>Sprint Task Tracker</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Prioritize tasks with laser precision
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Never lose track of critical sprint blockers. Categorize tasks across <strong>Urgent</strong>, <strong>High</strong>, <strong>Medium</strong>, and <strong>Low</strong> priorities with dedicated URL query filters like <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">/tasks?priority=urgent</code>.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Assign tasks directly to workspace members with individual load visibility</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Configurable statuses: To Do, In Progress, In Review, and Completed</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Custom tagging, due dates, and sprint milestone tracking</span>
                </li>
              </ul>
            </div>

            {/* Feature Visual */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-850">
                  <span className="text-xs font-semibold text-zinc-500">Filter Active: Priority = Urgent</span>
                  <span className="rounded-full bg-rose-500/10 text-rose-600 px-2 py-0.5 text-[10px] font-semibold">2 Tasks</span>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="rounded-lg border border-rose-200/80 bg-rose-50/20 p-3.5 dark:border-rose-900/30 dark:bg-rose-950/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-rose-600 dark:text-rose-400">CRITICAL BLOCKER</span>
                      <span className="text-zinc-400">#TSK-104</span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-zinc-900 dark:text-white">
                      Fix Redis Session Store Connection Pool Exhaustion
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                      <span>Assigned: <strong>Alex Chen</strong></span>
                      <span className="text-rose-500 font-medium">Due in 3 hours</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">HIGH PRIORITY</span>
                      <span className="text-zinc-400">#TSK-107</span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-zinc-900 dark:text-white">
                      Implement Multi-file Drag & Drop for Chat Input
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                      <span>Assigned: <strong>Sarah Connor</strong></span>
                      <span className="text-zinc-400">Tomorrow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Channels & Chat with Media Attachments */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Visual */}
            <div className="order-2 lg:order-1 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-850">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">#general</span>
                    <span className="text-xs text-zinc-400">Workspace Channel</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400">3 online</span>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="flex gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      AC
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white">Alex Chen</span>
                        <span className="text-[10px] text-zinc-400">10:42 AM</span>
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-700 dark:text-zinc-300">
                        Uploaded the updated sprint system architecture spec for review:
                      </p>
                      {/* Attached file mock */}
                      <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                        <FileText className="h-4 w-4 text-indigo-500" />
                        <span>Sprint_24_Architecture_v2.pdf</span>
                        <span className="text-[10px] text-zinc-400">(2.4 MB)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <MessageSquare className="h-4 w-4" />
                <span>Integrated Channels & Chat</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Team discussion where the work actually happens
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Stop switching between Slack, Teams, and Jira. Discuss tasks in topic channels or 1-on-1 direct messages right inside your workspace without breaking flow.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Topic channels like <code className="font-mono text-xs">#general</code>, <code className="font-mono text-xs">#engineering</code>, and custom team rooms</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Direct 1-on-1 private messaging with any workspace member</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Media & document file upload attachments with inline previews</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Feature 3: Workspaces & Members */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/60 dark:text-purple-400">
                <Users2 className="h-4 w-4" />
                <span>Workspaces & Roles</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Multi-tenant organizations with role-based access
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Manage multiple products, client sprints, or departments under isolated workspaces. Granular roles ensure contributors have clear focus while admins manage delivery.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">Workspace Owner / Admin</div>
                  <p className="mt-1 text-xs text-zinc-500">Full control over members, channels, integrations, and workspace settings.</p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">Member & Assignee</div>
                  <p className="mt-1 text-xs text-zinc-500">Create tasks, take ownership of issues, participate in channels, and send files.</p>
                </div>
              </div>
            </div>

            {/* Feature Visual */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Workspace Team Roster (5 Members)
                </h3>
                <div className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-850">
                  <div className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold dark:bg-zinc-100 dark:text-zinc-900">
                        TT
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-900 dark:text-white">Tushar Tayal</div>
                        <div className="text-[11px] text-zinc-500">tushar@tasktracker.internal</div>
                      </div>
                    </div>
                    <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                      Owner
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold dark:bg-emerald-950 dark:text-emerald-300">
                        SC
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-900 dark:text-white">Sarah Connor</div>
                        <div className="text-[11px] text-zinc-500">Lead Frontend Engineer</div>
                      </div>
                    </div>
                    <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      Admin
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold dark:bg-blue-950 dark:text-blue-300">
                        AC
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-900 dark:text-white">Alex Chen</div>
                        <div className="text-[11px] text-zinc-500">Backend Architect</div>
                      </div>
                    </div>
                    <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      Member
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-200 bg-zinc-50 p-10 dark:border-zinc-800 dark:bg-zinc-900/60">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Ready to transform your sprint workflow?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Zero complicated configurations. Launch a workspace in under 30 seconds and start shipping tasks with your team.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={APP_CONFIG.routes.workspaces}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Open Workspace Now
                </Button>
              </Link>
              <Link href={APP_CONFIG.routes.contact}>
                <Button variant="outline" size="lg">
                  Talk to Us
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
