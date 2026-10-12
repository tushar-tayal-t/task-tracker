import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { taskApi } from './task.api';
import { taskKeys } from './task.keys';
import { Task } from '../types/task.types';

/**
 * Hook to create a new task with cache invalidation
 */
export function useCreateTaskMutation(
  options?: UseMutationOptions<Task, Error, Partial<Task>>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (payload: Partial<Task>) => taskApi.createTask(payload),
    onSuccess: (data, variables, context, meta) => {
      // Invalidate task lists and stats queries
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.stats() });
      options?.onSuccess?.(data, variables, context, meta);
    },
  });
}

/**
 * Hook to update an existing task with cache invalidation
 */
export function useUpdateTaskMutation(
  options?: UseMutationOptions<Task, Error, { id: string; payload: Partial<Task> }>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Task> }) =>
      taskApi.updateTask(id, payload),
    onSuccess: (data, variables, context, meta) => {
      // Invalidate specific task detail and all task lists
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.stats() });
      options?.onSuccess?.(data, variables, context, meta);
    },
  });
}

/**
 * Hook to delete a task with cache invalidation
 */
export function useDeleteTaskMutation(
  options?: UseMutationOptions<void, Error, string>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (id: string) => taskApi.deleteTask(id),
    onSuccess: (data, variables, context, meta) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.stats() });
      options?.onSuccess?.(data, variables, context, meta);
    },
  });
}
