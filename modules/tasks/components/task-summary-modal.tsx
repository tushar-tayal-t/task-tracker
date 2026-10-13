'use client';

import React from 'react';
import Link from 'next/link';
import { Task } from '../types/task.types';
import { Button } from '@/components/ui/button';
import {
  X,
  Calendar,
  Tag,
  ArrowRight,
  Flame,
  ArrowUp,
  Minus,
  ArrowDown,
  User,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface TaskSummaryModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
}

export function TaskSummaryModal({
  task,
  isOpen,
  onClose,
  workspaceId,
}: TaskSummaryModalProps) {
  if (!isOpen || !task) return null;

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

  const pBadge = priorityBadgeConfig[task.priority] || priorityBadgeConfig.MEDIUM;
  const sBadge = statusBadgeConfig[task.status] || statusBadgeConfig.TODO;
  const PriorityIcon = pBadge.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                #{task.id}
              </span>
              <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${pBadge.color}`}>
                <PriorityIcon className="h-3 w-3" />
                <span>{pBadge.label}</span>
              </span>
              <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${sBadge.color}`}>
                {sBadge.label}
              </span>
            </div>
            <h2 className="mt-2 text-base font-bold text-zinc-900 dark:text-white leading-snug">
              {task.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Task Summary Body */}
        <div className="py-4 space-y-4">
          {/* Description */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Summary
            </h4>
            <p className="mt-1.5 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-950/60 p-3 rounded-xl border border-zinc-100 dark:border-zinc-850">
              {task.description || 'No detailed description provided for this task.'}
            </p>
          </div>

          {/* Details Grid: Assignee & Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-3 dark:border-zinc-850 dark:bg-zinc-950/40">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Assignee
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                {task.assignee ? (
                  <>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      {task.assignee.name.charAt(0)}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                        {task.assignee.name}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate">
                        {task.assignee.email}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 italic">
                    <User className="h-3.5 w-3.5" />
                    <span>Unassigned</span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-3 dark:border-zinc-850 dark:bg-zinc-950/40">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Due Date
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-white">
                <Calendar className="h-4 w-4 text-zinc-400" />
                <span>{task.dueDate}</span>
              </div>
              <div className="mt-0.5 text-[10px] text-zinc-400">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Tags & Milestones
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-mono text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Close
          </Button>

          <Link
            href={`/workspaces/${workspaceId}/tasks/${task.id}`}
            onClick={onClose}
          >
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              className="text-xs"
            >
              View Full Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
