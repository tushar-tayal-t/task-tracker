/**
 * Common cross-module TypeScript types for TaskTracker
 */

export type UUID = string;

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED' | 'CANCELLED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface BaseEntity {
  id: UUID;
  createdAt: string;
  updatedAt: string;
}

export interface UserSummary {
  id: UUID;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER' | 'GUEST';
}

export interface TaskSummary {
  id: UUID;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId?: UUID;
  projectName?: string;
  assignee?: UserSummary;
  dueDate?: string;
  progressPercentage?: number;
  tags?: string[];
}

export interface ProjectSummary {
  id: UUID;
  name: string;
  key: string;
  description?: string;
  taskCount: number;
  completedTaskCount: number;
  owner: UserSummary;
}

export interface NavRoute {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  isExternal?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
