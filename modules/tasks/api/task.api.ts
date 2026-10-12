import { apiClient } from '@/lib/api/client';
import { Task, TaskFilterOptions, TaskStats } from '../types/task.types';

export const taskApi = {
  /**
   * Fetch all tasks with optional filters from external backend
   */
  getTasks: async (filters?: TaskFilterOptions): Promise<Task[]> => {
    return apiClient.get<Task[]>('/tasks', {
      params: filters,
    });
  },

  /**
   * Fetch single task details by ID
   */
  getTaskById: async (id: string): Promise<Task> => {
    return apiClient.get<Task>(`/tasks/${id}`);
  },

  /**
   * Create a new task
   */
  createTask: async (payload: Partial<Task>): Promise<Task> => {
    return apiClient.post<Task>('/tasks', payload);
  },

  /**
   * Update an existing task
   */
  updateTask: async (id: string, payload: Partial<Task>): Promise<Task> => {
    return apiClient.patch<Task>(`/tasks/${id}`, payload);
  },

  /**
   * Delete a task by ID
   */
  deleteTask: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/tasks/${id}`);
  },

  /**
   * Fetch aggregate task statistics
   */
  getTaskStats: async (): Promise<TaskStats> => {
    return apiClient.get<TaskStats>('/tasks/stats');
  },
};
