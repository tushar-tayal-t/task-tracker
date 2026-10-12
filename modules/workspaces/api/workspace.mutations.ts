'use client';

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { workspaceApi } from './workspace.api';
import { workspaceKeys } from './workspace.keys';
import { Workspace, CreateWorkspacePayload } from '../types/workspace.types';

export function useCreateWorkspaceMutation(
  options?: UseMutationOptions<Workspace, Error, CreateWorkspacePayload>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (payload: CreateWorkspacePayload) => workspaceApi.createWorkspace(payload),
    onSuccess: (data, variables, context, meta) => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
      options?.onSuccess?.(data, variables, context, meta);
    },
  });
}
