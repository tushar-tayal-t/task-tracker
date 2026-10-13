'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTaskDetailQuery, useUpdateTaskMutation } from '@/modules/tasks';
import { useWorkspaceDetailQuery } from '@/modules/workspaces';
import { TaskStatus, TaskPriority } from '@/types/common.types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  Flame,
  ArrowUp,
  Minus,
  ArrowDown,
  Tag,
  Share2,
  FileText,
  Activity,
  Layers,
} from 'lucide-react';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';
  const taskId = typeof params?.taskId === 'string' ? params.taskId : '';

  const { data: workspace } = useWorkspaceDetailQuery(workspaceId);
  const { data: task, isLoading, error } = useTaskDetailQuery(taskId);
  const updateTaskMutation = useUpdateTaskMutation();

  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(null);

  const priorityBadgeConfig = {
    URGENT: {
      label: 'Urgent',
      icon: Flame,
      color: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400',
    },
    HIGH: {
      label: 'High',
      icon: ArrowUp,
      color: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-400',
    },
    MEDIUM: {
      label: 'Medium',
      icon: Minus,
      color: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-400',
    },
    LOW: {
      label: 'Low',
      icon: ArrowDown,
      color: 'border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400',
    },
  };

  const statusBadgeConfig = {
    TODO: { label: 'To Do', color: 'border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-300' },
    IN_PROGRESS: { label: 'In Progress', color: 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-300' },
    IN_REVIEW: { label: 'In Review', color: 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/40 dark:bg-purple-950/40 dark:text-purple-300' },
    COMPLETED: { label: 'Completed', color: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-400' },
    CANCELLED: { label: 'Cancelled', color: 'border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-500' },
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (!task) return;
    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        payload: { status: newStatus },
      });
      setSelectedStatus(newStatus);
      toast.success(`Task status updated to ${newStatus.replace('_', ' ')}`);
    } catch {
      toast.error('Failed to update task status.');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        <div className="h-32 rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-64 rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
          <div className="h-64 rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <AlertCircle className="h-10 w-10 text-rose-500 mb-3" />
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Task Not Found</h2>
        <p className="mt-1 text-xs text-zinc-500 max-w-sm">
          Could not find task with ID <code className="font-mono">{taskId}</code> in this workspace.
        </p>
        <Link href={`/workspaces/${workspaceId}/tasks`} className="mt-5">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
            Back to Task Tracker
          </Button>
        </Link>
      </div>
    );
  }

  const currentStatus = selectedStatus || task.status;
  const pBadge = priorityBadgeConfig[task.priority] || priorityBadgeConfig.MEDIUM;
  const sBadge = statusBadgeConfig[currentStatus] || statusBadgeConfig.TODO;
  const PriorityIcon = pBadge.icon;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Link
            href={`/workspaces/${workspaceId}/tasks`}
            className="flex items-center gap-1.5 font-medium hover:text-zinc-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Task Tracker</span>
          </Link>
          <span>/</span>
          <span className="font-mono text-zinc-400">#{task.id}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Mark Complete */}
          {currentStatus !== 'COMPLETED' ? (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<CheckCircle2 className="h-3.5 w-3.5" />}
              onClick={() => handleStatusChange('COMPLETED')}
              isLoading={updateTaskMutation.isPending}
            >
              Mark Completed
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('IN_PROGRESS')}
              isLoading={updateTaskMutation.isPending}
            >
              Reopen Task
            </Button>
          )}
        </div>
      </div>

      {/* Main Task Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Title, Description, Acceptance Criteria & Activity */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            {/* Status & Priority row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-semibold ${pBadge.color}`}>
                <PriorityIcon className="h-3.5 w-3.5" />
                <span>{pBadge.label} Priority</span>
              </span>

              <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${sBadge.color}`}>
                {sBadge.label}
              </span>

              <span className="font-mono text-xs text-zinc-400 ml-auto">
                ID: {task.id}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {task.title}
            </h1>

            {/* Full Description */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Description & Specifications
              </h3>
              <div className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950/60 p-4 rounded-xl border border-zinc-100 dark:border-zinc-850">
                <p className="whitespace-pre-wrap">{task.description}</p>
              </div>
            </div>

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Sprint Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {task.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-mono text-zinc-700 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Activity / Audit History Mock */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
              <Activity className="h-4 w-4 text-indigo-500" />
              <span>Sprint Activity & History</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Task created</span> in sprint backlog
                  <span className="text-zinc-400 ml-2">{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {task.assignee && (
                <div className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    Assigned to <strong className="text-zinc-900 dark:text-white">{task.assignee.name}</strong>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  Status set to <strong className="text-zinc-900 dark:text-white">{currentStatus.replace('_', ' ')}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Meta Panel */}
        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Task Attributes
            </h3>

            {/* Quick Status Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                Current Status
              </label>
              <select
                value={currentStatus}
                onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                disabled={updateTaskMutation.isPending}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-100 cursor-pointer"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Assignee Card */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="block text-xs font-medium text-zinc-500 mb-2">
                Assigned Contributor
              </span>
              {task.assignee ? (
                <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                    {task.assignee.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                      {task.assignee.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 truncate">
                      {task.assignee.email}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-zinc-400 italic">
                  <User className="h-4 w-4" />
                  <span>Unassigned</span>
                </div>
              )}
            </div>

            {/* Due Date */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="block text-xs font-medium text-zinc-500 mb-1">
                Due Date
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white">
                <Calendar className="h-4 w-4 text-indigo-500" />
                <span>{task.dueDate}</span>
              </div>
            </div>

            {/* Workspace Context */}
            {workspace && (
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <span className="block text-xs font-medium text-zinc-500 mb-1">
                  Workspace
                </span>
                <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                  {workspace.name}
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  Plan: {workspace.plan}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
