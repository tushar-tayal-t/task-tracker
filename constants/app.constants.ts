import { TaskPriority, TaskStatus } from '@/types/common.types';

export const TASK_STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  TODO: {
    label: 'To Do',
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/20',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  IN_REVIEW: {
    label: 'In Review',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
};

export const TASK_PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; color: string; bg: string; dot: string }
> = {
  LOW: {
    label: 'Low',
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    dot: 'bg-zinc-400',
  },
  MEDIUM: {
    label: 'Medium',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    dot: 'bg-sky-400',
  },
  HIGH: {
    label: 'High',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    dot: 'bg-amber-400',
  },
  URGENT: {
    label: 'Urgent',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    dot: 'bg-rose-500',
  },
};

export const NAVIGATION_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
