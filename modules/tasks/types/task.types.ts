import { BaseEntity, TaskPriority, TaskStatus, UserSummary } from '@/types/common.types';

export interface Task extends BaseEntity {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  projectName?: string;
  assigneeId?: string;
  assignee?: UserSummary;
  dueDate: string;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
}

export interface TaskFilterOptions {
  status?: TaskStatus | 'ALL';
  priority?: TaskPriority | 'ALL';
  projectId?: string;
  searchQuery?: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  urgent: number;
}
