'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTasksQuery, Task, CreateTaskModal, TaskSummaryModal } from '@/modules/tasks';
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
  List as ListIcon,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTaskForSummary, setSelectedTaskForSummary] = useState<Task | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

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
    setCurrentPage(1);
    if (val === 'ALL') {
      router.push(`/workspaces/${workspaceId}/tasks`);
    } else {
      router.push(`/workspaces/${workspaceId}/tasks?priority=${val.toLowerCase()}`);
    }
  };

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedAssignee, currentPriorityParam, pageSize]);

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

  // Paginated slice
  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredTasks.length);
  const paginatedTasks = useMemo(() => {
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, startIndex, endIndex]);

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
          {/* View Mode Toggle */}
          <div className="inline-flex items-center rounded-lg border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
              title="List View"
            >
              <ListIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Assign New Task
          </Button>
        </div>
      </div>

      {/* Priority Tabs Bar (Preserved Menus: All Tasks, Urgent, High, Medium, Low) */}
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
        </div>
      </div>

      {/* Task Content: List View (Default) or Grid View */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-16 rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 animate-pulse" />
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center">
          <CheckSquare2 className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="mt-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">No tasks found</h3>
          <p className="mt-1 text-xs text-zinc-500">
            {currentPriorityParam !== 'ALL'
              ? `No ${currentPriorityParam.toLowerCase()} priority tasks found with current filters.`
              : 'Create a task above to start tracking sprint deliverables.'}
          </p>
        </div>
      ) : viewMode === 'list' ? (
        /* High-Density Agile List View with Clickable Rows for Summary */
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 items-center border-b border-zinc-200 bg-zinc-50/70 px-4 py-2.5 text-[11px] font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400">
            <div className="col-span-2">Status</div>
            <div className="col-span-5">Task & Backlog Details</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-1 text-right pr-2">Due Date</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {paginatedTasks.map((task) => {
              const pBadge = priorityBadgeConfig[task.priority] || priorityBadgeConfig.MEDIUM;
              const sBadge = statusBadgeConfig[task.status] || statusBadgeConfig.TODO;
              const PriorityIcon = pBadge.icon;

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskForSummary(task)}
                  className="group flex flex-col sm:grid sm:grid-cols-12 sm:items-center px-4 py-3.5 hover:bg-zinc-50/90 dark:hover:bg-zinc-850/60 transition gap-2 sm:gap-0 cursor-pointer"
                  title="Click to view task summary"
                >
                  {/* Status Column */}
                  <div className="sm:col-span-2 flex items-center">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${sBadge.color}`}>
                      {sBadge.label}
                    </span>
                  </div>

                  {/* Task Details Column */}
                  <div className="sm:col-span-5 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 shrink-0">
                        #{task.id}
                      </span>
                      <h3 className="text-xs font-semibold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {task.title}
                      </h3>
                    </div>
                    {task.description && (
                      <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {task.description}
                      </p>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.2 text-[9px] font-mono text-zinc-600 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Priority Column */}
                  <div className="sm:col-span-2 flex items-center">
                    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${pBadge.color}`}>
                      <PriorityIcon className="h-3 w-3" />
                      <span>{pBadge.label}</span>
                    </span>
                  </div>

                  {/* Assignee Column */}
                  <div className="sm:col-span-2 flex items-center gap-2">
                    {task.assignee ? (
                      <>
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 text-[9px] font-bold text-zinc-800 dark:text-zinc-200 shrink-0">
                          {task.assignee.name.charAt(0)}
                        </div>
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium truncate">
                          {task.assignee.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-zinc-400 italic">Unassigned</span>
                    )}
                  </div>

                  {/* Due Date Column */}
                  <div className="sm:col-span-1 flex sm:justify-end items-center gap-1.5 text-xs text-zinc-500 pr-2">
                    <Calendar className="h-3 w-3 text-zinc-400" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Grid / Cards View with Clickable Cards for Summary */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {paginatedTasks.map((task) => {
            const pBadge = priorityBadgeConfig[task.priority] || priorityBadgeConfig.MEDIUM;
            const sBadge = statusBadgeConfig[task.status] || statusBadgeConfig.TODO;
            const PriorityIcon = pBadge.icon;

            return (
              <div
                key={task.id}
                onClick={() => setSelectedTaskForSummary(task)}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4.5 shadow-xs hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 transition cursor-pointer"
                title="Click to view task summary"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${pBadge.color}`}>
                      <PriorityIcon className="h-3 w-3" />
                      <span>{pBadge.label}</span>
                    </span>

                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${sBadge.color}`}>
                      {sBadge.label}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-sm font-semibold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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

      {/* Pagination Bar */}
      {filteredTasks.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-zinc-900 dark:text-white">{startIndex + 1}</strong> to{' '}
              <strong className="text-zinc-900 dark:text-white">{endIndex}</strong> of{' '}
              <strong className="text-zinc-900 dark:text-white">{filteredTasks.length}</strong> tasks
            </span>

            <span className="text-zinc-300 dark:text-zinc-700">|</span>

            <div className="flex items-center gap-1">
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 cursor-pointer"
              >
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          {/* Page navigation controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 disabled:pointer-events-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Prev</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`h-7 w-7 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-850'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 disabled:pointer-events-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Task Summary Modal (Opens on row/card click) */}
      <TaskSummaryModal
        task={selectedTaskForSummary}
        isOpen={!!selectedTaskForSummary}
        onClose={() => setSelectedTaskForSummary(null)}
        workspaceId={workspaceId}
      />

      {/* Create & Assign Task Modal */}
      <CreateTaskModal
        workspaceId={workspaceId}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
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
