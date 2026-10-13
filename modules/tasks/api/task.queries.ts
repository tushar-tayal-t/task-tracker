import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { taskApi } from './task.api';
import { taskKeys } from './task.keys';
import { Task, TaskFilterOptions, TaskStats } from '../types/task.types';

/**
 * Hook to query tasks with filter criteria
 */
export function useTasksQuery(
  filters?: TaskFilterOptions,
  options?: Omit<UseQueryOptions<Task[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Task[], Error>({
    queryKey: taskKeys.list(filters),
    queryFn: () => taskApi.getTasks(filters),
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    ...options,
  });
}

/**
 * Hook to query single task details by ID
 */
export function useTaskDetailQuery(
  id: string,
  options?: Omit<UseQueryOptions<Task, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Task, Error>({
    queryKey: taskKeys.detail(id),
    queryFn: () => taskApi.getTaskById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Hook to query task analytics and stats
 */
export function useTaskStatsQuery(
  options?: Omit<UseQueryOptions<TaskStats, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TaskStats, Error>({
    queryKey: taskKeys.stats(),
    queryFn: () => taskApi.getTaskStats(),
    ...options,
  });
}
