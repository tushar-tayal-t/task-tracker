'use client';

import React, { useState, useMemo } from 'react';
import { Task } from '../types/task.types';
import { TaskStatus, TaskPriority } from '@/types/common.types';
import { TASK_STATUS_CONFIG, TASK_PRIORITY_CONFIG } from '@/constants/app.constants';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  FolderGit2,
  Calendar,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const INITIAL_TASKS: Task[] = [
  {
    id: 'tsk-001',
    title: 'Architect Domain-Driven Modular Engine',
    description: 'Implement clean separation of concerns with feature modules and technical core.',
    status: 'COMPLETED',
    priority: 'URGENT',
    projectId: 'prj-101',
    projectName: 'Core Engine v1',
    assignee: {
      id: 'usr-1',
      name: 'Sarah Connor',
      email: 'sarah@tasktracker.io',
      role: 'ADMIN',
    },
    dueDate: '2026-10-15',
    tags: ['Architecture', 'Scalability'],
    createdAt: '2026-10-01',
    updatedAt: '2026-10-10',
  },
  {
    id: 'tsk-002',
    title: 'Implement Granular RBAC Permissions Engine',
    description: 'Provide hierarchical role authorization across admin, manager, member, and viewer levels.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    projectId: 'prj-101',
    projectName: 'Security Layer',
    assignee: {
      id: 'usr-2',
      name: 'Alex Rivera',
      email: 'alex@tasktracker.io',
      role: 'MANAGER',
    },
    dueDate: '2026-10-18',
    tags: ['Security', 'RBAC', 'Auth'],
    createdAt: '2026-10-02',
    updatedAt: '2026-10-11',
  },
  {
    id: 'tsk-003',
    title: 'Build Real-Time Kanban Sprint Board',
    description: 'Smooth drag-and-drop task movements with TanStack Query optimistic updates.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    projectId: 'prj-102',
    projectName: 'Frontend UI',
    assignee: {
      id: 'usr-3',
      name: 'Devon Vance',
      email: 'devon@tasktracker.io',
      role: 'MEMBER',
    },
    dueDate: '2026-10-20',
    tags: ['UI/UX', 'Kanban'],
    createdAt: '2026-10-04',
    updatedAt: '2026-10-11',
  },
  {
    id: 'tsk-004',
    title: 'Automated Burndown & Velocity Analytics',
    description: 'Compute team cycle times, sprint story completion, and automated weekly digests.',
    status: 'TODO',
    priority: 'MEDIUM',
    projectId: 'prj-103',
    projectName: 'Telemetry',
    assignee: {
      id: 'usr-4',
      name: 'Elena Rostova',
      email: 'elena@tasktracker.io',
      role: 'MEMBER',
    },
    dueDate: '2026-10-25',
    tags: ['Analytics', 'Reports'],
    createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
  },
  {
    id: 'tsk-005',
    title: 'Connect Next.js 16 App Router Dynamic Route Handlers',
    description: 'Ensure low-latency REST endpoints for task CRUD operations with zod validations.',
    status: 'IN_REVIEW',
    priority: 'HIGH',
    projectId: 'prj-101',
    projectName: 'API Layer',
    assignee: {
      id: 'usr-1',
      name: 'Sarah Connor',
      email: 'sarah@tasktracker.io',
      role: 'ADMIN',
    },
    dueDate: '2026-10-17',
    tags: ['Next.js', 'API'],
    createdAt: '2026-10-03',
    updatedAt: '2026-10-11',
  },
];

export function TaskPreviewBoard() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeStatus, setActiveStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickTitle, setQuickTitle] = useState('');

  // Status toggle handler
  const handleToggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus: TaskStatus =
          t.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
        return {
          ...t,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  // Add quick task
  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    const newTask: Task = {
      id: `tsk-${Date.now().toString().slice(-4)}`,
      title: quickTitle.trim(),
      description: 'Quick task added via interactive demo preview.',
      status: 'TODO',
      priority: 'MEDIUM',
      projectId: 'prj-101',
      projectName: 'Sprint Sandbox',
      assignee: {
        id: 'usr-current',
        name: 'You (Visitor)',
        email: 'you@guest.io',
        role: 'MEMBER',
      },
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
      tags: ['Live Demo', 'Interactive'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    setQuickTitle('');
  };

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        activeStatus === 'ALL' || task.status === activeStatus;
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesStatus && matchesSearch;
    });
  }, [tasks, activeStatus, searchQuery]);

  // Dynamic statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
    const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
    const urgent = tasks.filter((t) => t.priority === 'URGENT').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, urgent, percentage };
  }, [tasks]);

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Top Bar with KPI Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 mb-6">
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Tasks</span>
            <FolderGit2 className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{stats.total}</div>
          <span className="text-[11px] text-zinc-500">Live in active sprint</span>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>In Progress</span>
            <Clock className="h-4 w-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-blue-400">{stats.inProgress}</div>
          <span className="text-[11px] text-zinc-500">Actively worked on</span>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">{stats.completed}</div>
          <span className="text-[11px] text-zinc-500">Ready for release</span>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Sprint Velocity</span>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-purple-400">{stats.percentage}%</div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Control Bar: Filter Tabs & Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED'].map((statusKey) => {
            const isSelected = activeStatus === statusKey;
            const label =
              statusKey === 'ALL'
                ? 'All'
                : TASK_STATUS_CONFIG[statusKey as TaskStatus]?.label || statusKey;
            return (
              <button
                key={statusKey}
                onClick={() => setActiveStatus(statusKey)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tasks or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Interactive Quick Add Task Form */}
      <form onSubmit={handleQuickAdd} className="my-4 flex items-center gap-2">
        <input
          type="text"
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
          placeholder="Try it: Type a new task title and press Enter..."
          className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950/90 px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-3.5 w-3.5" />}
        >
          Add Task
        </Button>
      </form>

      {/* Task List Items */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 py-10 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-zinc-600" />
            <p className="mt-2 text-sm text-zinc-400">No tasks found matching your filter</p>
            <button
              onClick={() => {
                setActiveStatus('ALL');
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-indigo-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const statusCfg = TASK_STATUS_CONFIG[task.status];
            const priorityCfg = TASK_PRIORITY_CONFIG[task.priority];
            const isDone = task.status === 'COMPLETED';

            return (
              <div
                key={task.id}
                className="group flex flex-col gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-3.5 transition-all hover:border-zinc-700 hover:bg-zinc-900/50 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Checkbox & Details */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggleTaskStatus(task.id)}
                    aria-label={`Toggle status for ${task.title}`}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition cursor-pointer ${
                      isDone
                        ? 'border-emerald-500 bg-emerald-500 text-zinc-950 shadow-sm shadow-emerald-500/30'
                        : 'border-zinc-700 bg-zinc-900 hover:border-indigo-400'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="h-4 w-4 stroke-[3]" />}
                  </button>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-sm font-medium transition ${
                          isDone
                            ? 'text-zinc-500 line-through'
                            : 'text-zinc-100 group-hover:text-indigo-300'
                        }`}
                      >
                        {task.title}
                      </span>
                      {task.projectName && (
                        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                          {task.projectName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">{task.description}</p>
                  </div>
                </div>

                {/* Badges: Priority, Status, Assignee, Due Date */}
                <div className="flex flex-wrap items-center gap-2.5 sm:shrink-0">
                  {/* Priority Tag */}
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold ${priorityCfg.bg} ${priorityCfg.color}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${priorityCfg.dot}`} />
                    {priorityCfg.label}
                  </div>

                  {/* Status Tag */}
                  <div
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${statusCfg.bg} ${statusCfg.color} ${statusCfg.border}`}
                  >
                    {statusCfg.label}
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <Calendar className="h-3 w-3" />
                    <span>{task.dueDate}</span>
                  </div>

                  {/* Assignee Avatar */}
                  {task.assignee && (
                    <div
                      title={`Assigned to ${task.assignee.name} (${task.assignee.role})`}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-[10px] font-bold text-white shadow-sm"
                    >
                      {task.assignee.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer helper */}
      <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-800/80 pt-3">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          Interactive Demo: Click checkmarks to toggle task completion.
        </span>
        <span className="font-mono text-zinc-400">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </span>
      </div>
    </div>
  );
}
