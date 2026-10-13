'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useWorkspaceDetailQuery } from '@/modules/workspaces';
import { Button } from '@/components/ui/button';
import {
  CheckSquare2,
  Users,
  ArrowRight,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
  FolderGit2,
} from 'lucide-react';
import { LazyText3D } from '@/components/ui/lazy-text-3d';

export default function WorkspaceOverviewPage() {
  const params = useParams();
  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';

  const {
    data: workspace,
    isLoading,
    error,
    refetch,
  } = useWorkspaceDetailQuery(workspaceId);

  if (error) {
    return (
      <div className="flex min-h-[350px] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-base font-bold text-zinc-900 dark:text-white">Failed to load workspace</h2>
          <p className="mt-1 text-xs text-zinc-500">
            Could not retrieve workspace details for <code className="font-mono text-zinc-800 dark:text-zinc-200">{workspaceId}</code>.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            className="mt-5"
          >
            Retry Request
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-28 rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-24 rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 animate-pulse" />
          <div className="h-24 rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 animate-pulse" />
          <div className="h-24 rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!workspace) return null;

  return (
    <div className="space-y-6">
      {/* Workspace Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <div className="flex flex-wrap items-center gap-3 py-1">
            <h1 className="sr-only">{workspace.name}</h1>
            <LazyText3D
              text={workspace.name}
              size="md"
              layersCount={24}
              spacing={1.2}
              showBadge={true}
              interactive={true}
              fallbackClassName="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight"
            />
            <span className="rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {workspace.plan}
            </span>
          </div>

          <p className="mt-1.5 text-xs text-zinc-500 max-w-2xl leading-relaxed">
            {workspace.description || 'Sprint task tracker, team communication, and backlog management.'}
          </p>

          <div className="mt-3 flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
            <span>ID: <strong className="text-zinc-700 dark:text-zinc-300">{workspace.id}</strong></span>
            <span>&bull;</span>
            <span>Role: <strong className="text-zinc-700 dark:text-zinc-300">{workspace.role}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href={`/workspaces/${workspaceId}/tasks`}>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<CheckSquare2 className="h-3.5 w-3.5" />}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Open Task Tracker
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Task Tracker Metric */}
        <Link
          href={`/workspaces/${workspaceId}/tasks`}
          className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-xs hover:border-zinc-300 hover:bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-850 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Tasks in Sprint</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
              <CheckSquare2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
            {workspace.taskCount}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
            <span>View backlog & board</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </Link>

        {/* Chats & Groups Metric */}
        <Link
          href={`/workspaces/${workspaceId}/chat`}
          className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-xs hover:border-zinc-300 hover:bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-850 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Chats & Groups</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
            Channels
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
            <span>Open team discussions</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </Link>

        {/* Members Metric */}
        <Link
          href={`/workspaces/${workspaceId}/members`}
          className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-xs hover:border-zinc-300 hover:bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-850 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Collaborators</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
            {workspace.memberCount}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
            <span>Manage members & roles</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </Link>
      </div>

      {/* Quick Priority Jump */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Quick Task Filters
        </h3>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <Link
            href={`/workspaces/${workspaceId}/tasks?priority=urgent`}
            className="flex items-center justify-between rounded-lg border border-zinc-200 p-2.5 text-xs text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <span className="font-medium">Urgent</span>
            <ArrowRight className="h-3 w-3 text-zinc-400" />
          </Link>

          <Link
            href={`/workspaces/${workspaceId}/tasks?priority=high`}
            className="flex items-center justify-between rounded-lg border border-zinc-200 p-2.5 text-xs text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <span className="font-medium">High Priority</span>
            <ArrowRight className="h-3 w-3 text-zinc-400" />
          </Link>

          <Link
            href={`/workspaces/${workspaceId}/tasks?priority=medium`}
            className="flex items-center justify-between rounded-lg border border-zinc-200 p-2.5 text-xs text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <span className="font-medium">Medium Priority</span>
            <ArrowRight className="h-3 w-3 text-zinc-400" />
          </Link>

          <Link
            href={`/workspaces/${workspaceId}/tasks?priority=low`}
            className="flex items-center justify-between rounded-lg border border-zinc-200 p-2.5 text-xs text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <span className="font-medium">Low Priority</span>
            <ArrowRight className="h-3 w-3 text-zinc-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
