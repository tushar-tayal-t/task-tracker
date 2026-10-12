import { apiClient } from '@/lib/api/client';
import { Task, TaskFilterOptions, TaskStats } from '../types/task.types';
import { mockTaskApi } from './task.mock';

export const taskApi = {
  /**
   * Fetch all tasks with optional filters from external backend, falling back to mock if backend is down
   */
  getTasks: async (filters?: TaskFilterOptions): Promise<Task[]> => {
    try {
      return await apiClient.get<Task[]>('/tasks', {
        params: filters,
      });
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[taskApi.getTasks] External backend offline -> using mock fallback');
      return mockTaskApi.getTasks(filters);
    }
  },

  /**
   * Fetch single task details by ID
   */
  getTaskById: async (id: string): Promise<Task> => {
    try {
      return await apiClient.get<Task>(`/tasks/${id}`);
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[taskApi.getTaskById] External backend offline -> using mock fallback for id: ${id}`);
      return mockTaskApi.getTaskById(id);
    }
  },

  /**
   * Create a new task
   */
  createTask: async (payload: Partial<Task>): Promise<Task> => {
    try {
      return await apiClient.post<Task>('/tasks', payload);
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[taskApi.createTask] External backend offline -> using mock fallback');
      return mockTaskApi.createTask(payload);
    }
  },

  /**
   * Update an existing task
   */
  updateTask: async (id: string, payload: Partial<Task>): Promise<Task> => {
    try {
      return await apiClient.patch<Task>(`/tasks/${id}`, payload);
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[taskApi.updateTask] External backend offline -> using mock fallback for id: ${id}`);
      return mockTaskApi.updateTask(id, payload);
    }
  },

  /**
   * Delete a task by ID
   */
  deleteTask: async (id: string): Promise<void> => {
    try {
      await apiClient.delete<void>(`/tasks/${id}`);
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[taskApi.deleteTask] External backend offline -> using mock fallback for id: ${id}`);
      await mockTaskApi.deleteTask(id);
    }
  },

  /**
   * Fetch aggregate task statistics
   */
  getTaskStats: async (): Promise<TaskStats> => {
    try {
      return await apiClient.get<TaskStats>('/tasks/stats');
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[taskApi.getTaskStats] External backend offline -> using mock fallback');
      return mockTaskApi.getTaskStats();
    }
  },
};
