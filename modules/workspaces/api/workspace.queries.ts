'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { workspaceApi } from './workspace.api';
import { workspaceKeys } from './workspace.keys';
import { Workspace } from '../types/workspace.types';

export function useWorkspacesQuery(
  options?: Omit<UseQueryOptions<Workspace[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Workspace[], Error>({
    queryKey: workspaceKeys.lists(),
    queryFn: () => workspaceApi.getWorkspaces(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

export function useWorkspaceDetailQuery(
  id: string,
  options?: Omit<UseQueryOptions<Workspace, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Workspace, Error>({
    queryKey: workspaceKeys.detail(id),
    queryFn: () => workspaceApi.getWorkspaceById(id),
    enabled: Boolean(id),
    ...options,
  });
}
