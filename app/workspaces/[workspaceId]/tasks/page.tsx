'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTasksQuery, Task, CreateTaskModal } from '@/modules/tasks';
import { useMembersQuery } from '@/modules/members';
import { TaskPriority, TaskStatus } from '@/types/common.types';
import { Button } from '@/components/ui/button';
import {
  CheckSquare2,
  Plus,
  Search,
  Filter,
  Flame,
  ArrowUp,
  Minus,
  ArrowDown,
  Calendar,
} from 'lucide-react';

function TasksContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';
  const currentPriorityParam = searchParams.get('priority')?.toUpperCase() || 'ALL';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch workspace members for assignee filtering & assignment
  const { data: members = [] } = useMembersQuery(workspaceId);

  // Query tasks with live URL filters
  const { data: tasks = [], isLoading, isFetching } = useTasksQuery({
    workspaceId,
    priority: currentPriorityParam !== 'ALL' ? (currentPriorityParam as TaskPriority) : undefined,
  });

  const priorityTabs = [
    { label: 'All Tasks', value: 'ALL', icon: Filter },
    { label: 'Urgent', value: 'URGENT', icon: Flame },
    { label: 'High Priority', value: 'HIGH', icon: ArrowUp },
    { label: 'Medium Priority', value: 'MEDIUM', icon: Minus },
    { label: 'Low Priority', value: 'LOW', icon: ArrowDown },
  ];

  const handleSelectPriority = (val: string) => {
    if (val === 'ALL') {
      router.push(`/workspaces/${workspaceId}/tasks`);
    } else {
      router.push(`/workspaces/${workspaceId}/tasks?priority=${val.toLowerCase()}`);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatus === 'ALL' || task.status === selectedStatus;

      const matchesPriority =
        currentPriorityParam === 'ALL' || task.priority === currentPriorityParam;

      const matchesAssignee =
        selectedAssignee === 'ALL' || task.assignee?.id === selectedAssignee;

      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [tasks, searchQuery, selectedStatus, currentPriorityParam, selectedAssignee]);

  const priorityBadgeConfig = {
    URGENT: { label: 'Urgent', color: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400' },
    HIGH: { label: 'High', color: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-400' },
    MEDIUM: { label: 'Medium', color: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-400' },
    LOW: { label: 'Low', color: 'border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400' },
  };

  const statusBadgeConfig = {
    TODO: { label: 'To Do', color: 'border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-300' },
    IN_PROGRESS: { label: 'In Progress', color: 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-300' },
    IN_REVIEW: { label: 'Review', color: 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/40 dark:bg-purple-950/40 dark:text-purple-300' },
    COMPLETED: { label: 'Completed', color: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-400' },
    CANCELLED: { label: 'Cancelled', color: 'border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-500' },
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Task Tracker
            </h1>
            {isFetching && !isLoading && (
              <span className="text-[11px] font-mono text-zinc-400">
                Updating...
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Sprint backlog and assigned deliverables for workspace <code className="font-mono text-zinc-700 dark:text-zinc-300">{workspaceId}</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Assign New Task
          </Button>
        </div>
      </div>

      {/* Priority Tabs Bar (Clean high-contrast) */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
        {priorityTabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = currentPriorityParam === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleSelectPriority(tab.value)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs'
                  : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-850 dark:hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by title, description, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {/* Assignee Filter Dropdown */}
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-700 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 cursor-pointer"
          >
            <option value="ALL">All Assignees</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          {/* Status Pills */}
          {['ALL', 'TODO', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                selectedStatus === status
                  ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {status === 'ALL' ? 'All' : status.replace('_', ' ')}
            </button>
          ))}

          <span className="text-[11px] text-zinc-400 font-mono ml-1">
            {filteredTasks.length} task{filteredTasks.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Task Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-36 rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 animate-pulse" />
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 p-10 text-center">
          <CheckSquare2 className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="mt-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">No tasks found</h3>
          <p className="mt-1 text-xs text-zinc-500">
            {currentPriorityParam !== 'ALL'
              ? `No ${currentPriorityParam.toLowerCase()} priority tasks found with current filters.`
              : 'Create a task above to start tracking sprint deliverables.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTasks.map((task) => {
            const pBadge = priorityBadgeConfig[task.priority] || priorityBadgeConfig.MEDIUM;
            const sBadge = statusBadgeConfig[task.status] || statusBadgeConfig.TODO;

            return (
              <div
                key={task.id}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4.5 shadow-xs hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${pBadge.color}`}
                    >
                      {pBadge.label}
                    </span>

                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${sBadge.color}`}
                    >
                      {sBadge.label}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-sm font-semibold text-zinc-900 dark:text-white line-clamp-1">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>

                  {task.tags && task.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.2 text-[10px] font-mono text-zinc-600 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-2.5 text-[11px] text-zinc-500 dark:border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Calendar className="h-3 w-3" />
                    <span>{task.dueDate}</span>
                  </div>

                  {task.assignee && (
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 text-[9px] font-bold text-zinc-800 dark:text-zinc-200">
                        {task.assignee.name.charAt(0)}
                      </div>
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[90px]">
                        {task.assignee.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create & Assign Task Modal */}
      <CreateTaskModal
        workspaceId={workspaceId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPriority={currentPriorityParam !== 'ALL' ? (currentPriorityParam as TaskPriority) : 'MEDIUM'}
      />
    </div>
  );
}

export default function WorkspaceTasksPage() {
  return (
    <Suspense
      fallback={
        <div className="h-64 flex items-center justify-center text-zinc-400 text-xs font-mono">
          Loading tasks board...
        </div>
      }
    >
      <TasksContent />
    </Suspense>
  );
}
