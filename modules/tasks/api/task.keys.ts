import { TaskFilterOptions } from '../types/task.types';

/**
 * Hierarchical query and mutation key factory for Tasks
 */
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filters?: TaskFilterOptions) => [...taskKeys.lists(), filters ?? {}] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
  stats: () => [...taskKeys.all, 'stats'] as const,
} as const;
