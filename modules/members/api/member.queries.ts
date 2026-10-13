'use client';

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { memberApi } from './member.api';
import { memberKeys } from './member.keys';
import { WorkspaceMember, ChatMessage } from '../types/member.types';

/**
 * Hook to fetch workspace members
 */
export function useMembersQuery(
  workspaceId: string,
  options?: Omit<UseQueryOptions<WorkspaceMember[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<WorkspaceMember[], Error>({
    queryKey: memberKeys.lists(workspaceId),
    queryFn: () => memberApi.getMembers(workspaceId),
    enabled: Boolean(workspaceId),
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    ...options,
  });
}

/**
 * Hook to fetch single member details
 */
export function useMemberDetailQuery(
  workspaceId: string,
  memberId: string,
  options?: Omit<UseQueryOptions<WorkspaceMember, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<WorkspaceMember, Error>({
    queryKey: memberKeys.detail(workspaceId, memberId),
    queryFn: () => memberApi.getMemberById(workspaceId, memberId),
    enabled: Boolean(workspaceId && memberId),
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    ...options,
  });
}

/**
 * Hook to fetch direct messages
 */
export function useDirectMessagesQuery(
  workspaceId: string,
  memberId: string,
  options?: Omit<UseQueryOptions<ChatMessage[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ChatMessage[], Error>({
    queryKey: memberKeys.messages(workspaceId, memberId),
    queryFn: () => memberApi.getMessages(workspaceId, memberId),
    enabled: Boolean(workspaceId && memberId),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 3000, // Poll every 3 seconds for new messages during active chat
    ...options,
  });
}

/**
 * Hook to send message
 */
export function useSendMessageMutation(
  workspaceId: string,
  memberId: string,
  options?: UseMutationOptions<ChatMessage, Error, string>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (text: string) => memberApi.sendMessage(workspaceId, memberId, text),
    onSuccess: (newMsg, variables, context, meta) => {
      // Optimistically update conversation cache
      queryClient.setQueryData<ChatMessage[]>(
        memberKeys.messages(workspaceId, memberId),
        (old) => (old ? [...old, newMsg] : [newMsg])
      );
      options?.onSuccess?.(newMsg, variables, context, meta);
    },
  });
}
