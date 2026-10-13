import { apiClient } from '@/lib/api/client';
import { WorkspaceMember, ChatMessage } from '../types/member.types';
import { mockMemberApi } from './member.mock';

export const memberApi = {
  /**
   * Fetch members belonging to this workspace
   */
  getMembers: async (workspaceId: string): Promise<WorkspaceMember[]> => {
    try {
      const response = await apiClient.get<any>(`/workspaces/${workspaceId}/members`);
      if (Array.isArray(response)) return response;
      if (response && Array.isArray(response.data)) return response.data;
      if (response && Array.isArray(response.members)) return response.members;
      return (response as WorkspaceMember[]) || [];
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[memberApi.getMembers] External backend offline -> using mock for workspace ${workspaceId}`);
      return mockMemberApi.getMembers(workspaceId);
    }
  },

  /**
   * Fetch specific member details
   */
  getMemberById: async (workspaceId: string, memberId: string): Promise<WorkspaceMember> => {
    try {
      const response = await apiClient.get<any>(`/workspaces/${workspaceId}/members/${memberId}`);
      if (response && response.data) return response.data;
      if (response && response.member) return response.member;
      return response as WorkspaceMember;
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[memberApi.getMemberById] External backend offline -> using mock for member ${memberId}`);
      return mockMemberApi.getMemberById(workspaceId, memberId);
    }
  },

  /**
   * Fetch 1-on-1 direct messages between user and workspace member
   */
  getMessages: async (workspaceId: string, memberId: string): Promise<ChatMessage[]> => {
    try {
      const response = await apiClient.get<any>(`/workspaces/${workspaceId}/members/${memberId}/messages`);
      if (Array.isArray(response)) return response;
      if (response && Array.isArray(response.data)) return response.data;
      return (response as ChatMessage[]) || [];
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[memberApi.getMessages] External backend offline -> using mock for chat with ${memberId}`);
      return mockMemberApi.getMessages(workspaceId, memberId);
    }
  },

  /**
   * Send a message to a workspace member
   */
  sendMessage: async (workspaceId: string, memberId: string, text: string): Promise<ChatMessage> => {
    try {
      const response = await apiClient.post<any>(`/workspaces/${workspaceId}/members/${memberId}/messages`, {
        text,
      });
      if (response && response.data) return response.data;
      return response as ChatMessage;
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[memberApi.sendMessage] External backend offline -> using mock message send to ${memberId}`);
      return mockMemberApi.sendMessage(workspaceId, memberId, text);
    }
  },
};
