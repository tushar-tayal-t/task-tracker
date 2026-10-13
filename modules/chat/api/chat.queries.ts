'use client';

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { chatApi } from './chat.api';
import { chatKeys } from './chat.keys';
import { Channel, ChatMessage, CreateChannelPayload, SendMessagePayload } from '../types/chat.types';

/**
 * Hook to query all channels in workspace
 */
export function useChannelsQuery(
  workspaceId: string,
  options?: Omit<UseQueryOptions<Channel[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Channel[], Error>({
    queryKey: chatKeys.channels(workspaceId),
    queryFn: () => chatApi.getChannels(workspaceId),
    enabled: Boolean(workspaceId),
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    ...options,
  });
}

/**
 * Hook to query channel details
 */
export function useChannelDetailQuery(
  workspaceId: string,
  channelId: string,
  options?: Omit<UseQueryOptions<Channel, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Channel, Error>({
    queryKey: chatKeys.channelDetail(workspaceId, channelId),
    queryFn: () => chatApi.getChannelById(workspaceId, channelId),
    enabled: Boolean(workspaceId && channelId),
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    ...options,
  });
}

/**
 * Hook to create channel mutation
 */
export function useCreateChannelMutation(
  workspaceId: string,
  options?: UseMutationOptions<Channel, Error, CreateChannelPayload>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (payload: CreateChannelPayload) => chatApi.createChannel(workspaceId, payload),
    onSuccess: (newChn, variables, context, meta) => {
      queryClient.setQueryData<Channel[]>(chatKeys.channels(workspaceId), (old) =>
        old ? [...old, newChn] : [newChn]
      );
      options?.onSuccess?.(newChn, variables, context, meta);
    },
  });
}

/**
 * Hook to query channel messages
 */
export function useChannelMessagesQuery(
  workspaceId: string,
  channelId: string,
  options?: Omit<UseQueryOptions<ChatMessage[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ChatMessage[], Error>({
    queryKey: chatKeys.channelMessages(workspaceId, channelId),
    queryFn: () => chatApi.getChannelMessages(workspaceId, channelId),
    enabled: Boolean(workspaceId && channelId),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 3000, // Poll every 3 seconds for active group updates
    ...options,
  });
}

/**
 * Hook to send message to channel
 */
export function useSendChannelMessageMutation(
  workspaceId: string,
  channelId: string,
  options?: UseMutationOptions<ChatMessage, Error, SendMessagePayload>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (payload: SendMessagePayload) => chatApi.sendChannelMessage(workspaceId, channelId, payload),
    onSuccess: (newMsg, variables, context, meta) => {
      queryClient.setQueryData<ChatMessage[]>(chatKeys.channelMessages(workspaceId, channelId), (old) =>
        old ? [...old, newMsg] : [newMsg]
      );
      options?.onSuccess?.(newMsg, variables, context, meta);
    },
  });
}

/**
 * Hook to query 1-on-1 direct messages
 */
export function useDmMessagesQuery(
  workspaceId: string,
  memberId: string,
  options?: Omit<UseQueryOptions<ChatMessage[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ChatMessage[], Error>({
    queryKey: chatKeys.dmMessages(workspaceId, memberId),
    queryFn: () => chatApi.getDmMessages(workspaceId, memberId),
    enabled: Boolean(workspaceId && memberId),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 3000,
    ...options,
  });
}

/**
 * Hook to send 1-on-1 direct message
 */
export function useSendDmMessageMutation(
  workspaceId: string,
  memberId: string,
  options?: UseMutationOptions<ChatMessage, Error, SendMessagePayload>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (payload: SendMessagePayload) => chatApi.sendDmMessage(workspaceId, memberId, payload),
    onSuccess: (newMsg, variables, context, meta) => {
      queryClient.setQueryData<ChatMessage[]>(chatKeys.dmMessages(workspaceId, memberId), (old) =>
        old ? [...old, newMsg] : [newMsg]
      );
      options?.onSuccess?.(newMsg, variables, context, meta);
    },
  });
}
