import { apiClient } from '@/lib/api/client';
import { Channel, ChatMessage, CreateChannelPayload, SendMessagePayload } from '../types/chat.types';
import { mockChatApi } from './chat.mock';

export const chatApi = {
  /**
   * Fetch all group channels in workspace
   */
  getChannels: async (workspaceId: string): Promise<Channel[]> => {
    try {
      const response = await apiClient.get<any>(`/workspaces/${workspaceId}/channels`);
      if (Array.isArray(response)) return response;
      if (response && Array.isArray(response.data)) return response.data;
      if (response && Array.isArray(response.channels)) return response.channels;
      return (response as Channel[]) || [];
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[chatApi.getChannels] External backend offline -> using mock channels for workspace ${workspaceId}`);
      return mockChatApi.getChannels(workspaceId);
    }
  },

  /**
   * Fetch channel details
   */
  getChannelById: async (workspaceId: string, channelId: string): Promise<Channel> => {
    try {
      const response = await apiClient.get<any>(`/workspaces/${workspaceId}/channels/${channelId}`);
      if (response && response.data) return response.data;
      if (response && response.channel) return response.channel;
      return response as Channel;
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[chatApi.getChannelById] External backend offline -> using mock channel for ${channelId}`);
      return mockChatApi.getChannelById(workspaceId, channelId);
    }
  },

  /**
   * Create new group channel
   */
  createChannel: async (workspaceId: string, payload: CreateChannelPayload): Promise<Channel> => {
    try {
      const response = await apiClient.post<any>(`/workspaces/${workspaceId}/channels`, payload);
      if (response && response.data) return response.data;
      return response as Channel;
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[chatApi.createChannel] External backend offline -> using mock channel creation`);
      return mockChatApi.createChannel(workspaceId, payload);
    }
  },

  /**
   * Fetch messages for a group channel
   */
  getChannelMessages: async (workspaceId: string, channelId: string): Promise<ChatMessage[]> => {
    try {
      const response = await apiClient.get<any>(`/workspaces/${workspaceId}/channels/${channelId}/messages`);
      if (Array.isArray(response)) return response;
      if (response && Array.isArray(response.data)) return response.data;
      return (response as ChatMessage[]) || [];
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[chatApi.getChannelMessages] External backend offline -> using mock messages for channel ${channelId}`);
      return mockChatApi.getChannelMessages(workspaceId, channelId);
    }
  },

  /**
   * Send message to a group channel (supports media attachments)
   */
  sendChannelMessage: async (
    workspaceId: string,
    channelId: string,
    payload: SendMessagePayload
  ): Promise<ChatMessage> => {
    try {
      const response = await apiClient.post<any>(`/workspaces/${workspaceId}/channels/${channelId}/messages`, payload);
      if (response && response.data) return response.data;
      return response as ChatMessage;
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[chatApi.sendChannelMessage] External backend offline -> using mock message send for channel ${channelId}`);
      return mockChatApi.sendChannelMessage(workspaceId, channelId, payload);
    }
  },

  /**
   * Fetch 1-on-1 direct messages with member
   */
  getDmMessages: async (workspaceId: string, memberId: string): Promise<ChatMessage[]> => {
    try {
      const response = await apiClient.get<any>(`/workspaces/${workspaceId}/dm/${memberId}/messages`);
      if (Array.isArray(response)) return response;
      if (response && Array.isArray(response.data)) return response.data;
      return (response as ChatMessage[]) || [];
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[chatApi.getDmMessages] External backend offline -> using mock DM messages for ${memberId}`);
      return mockChatApi.getDmMessages(workspaceId, memberId);
    }
  },

  /**
   * Send 1-on-1 direct message to member (supports media attachments)
   */
  sendDmMessage: async (
    workspaceId: string,
    memberId: string,
    payload: SendMessagePayload
  ): Promise<ChatMessage> => {
    try {
      const response = await apiClient.post<any>(`/workspaces/${workspaceId}/dm/${memberId}/messages`, payload);
      if (response && response.data) return response.data;
      return response as ChatMessage;
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[chatApi.sendDmMessage] External backend offline -> using mock DM send to ${memberId}`);
      return mockChatApi.sendDmMessage(workspaceId, memberId, payload);
    }
  },
};
