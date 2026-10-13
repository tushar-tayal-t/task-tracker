'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useCreateTaskMutation } from '../api/task.mutations';
import { useMembersQuery } from '@/modules/members';
import { TaskPriority, TaskStatus } from '@/types/common.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  X,
  Plus,
  CheckSquare2,
  User,
  Calendar,
  Tag,
  AlertCircle,
} from 'lucide-react';

interface CreateTaskModalProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
  defaultPriority?: TaskPriority;
}

export function CreateTaskModal({
  workspaceId,
  isOpen,
  onClose,
  defaultPriority = 'MEDIUM',
}: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(defaultPriority);
  const [status, setStatus] = useState<TaskStatus>('TODO');
  const [dueDate, setDueDate] = useState('2026-10-25');
  const [assigneeId, setAssigneeId] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Fetch workspace members to populate the assignee dropdown
  const { data: members = [] } = useMembersQuery(workspaceId);

  const createMutation = useCreateTaskMutation({
    onSuccess: (newTask) => {
      toast.success(`Task "${newTask.title}" created & assigned!`);
      setTitle('');
      setDescription('');
      setAssigneeId('');
      setTagsInput('');
      onClose();
    },
    onError: () => {
      toast.error('Failed to create task. Please try again.');
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    const assignedMember = members.find((m) => m.id === assigneeId);

    const tags = tagsInput
      ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Sprint'];

    createMutation.mutate({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate,
      assigneeId: assigneeId || undefined,
      assignee: assignedMember
        ? {
            id: assignedMember.id,
            name: assignedMember.name,
            email: assignedMember.email,
            role: assignedMember.role,
          }
        : undefined,
      tags,
      projectId: 'prj-101',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <CheckSquare2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Create & Assign Task</h2>
            <p className="text-xs text-zinc-400">Delegate tasks to team members in this workspace</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="task-title" className="block text-xs font-medium text-zinc-300 mb-1.5">
              Task Title *
            </label>
            <Input
              id="task-title"
              placeholder="e.g. Implement media upload pipeline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="task-desc" className="block text-xs font-medium text-zinc-300 mb-1.5">
              Description
            </label>
            <textarea
              id="task-desc"
              rows={2}
              placeholder="What needs to be accomplished in this sprint task?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Assignee & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Assign to Member */}
            <div>
              <label htmlFor="assignee" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Assign to Member
              </label>
              <div className="relative">
                <select
                  id="assignee"
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-100 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">Unassigned</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-100 focus:border-indigo-500 focus:outline-none"
              >
                <option value="URGENT">Urgent Priority</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Status & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="status" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Initial Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-100 focus:border-indigo-500 focus:outline-none"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="due-date" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Due Date
              </label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-xs font-medium text-zinc-300 mb-1.5">
              Tags (comma separated)
            </label>
            <Input
              id="tags"
              placeholder="e.g. Architecture, Backend, API"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="glow"
              size="sm"
              isLoading={createMutation.isPending}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Assign & Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
