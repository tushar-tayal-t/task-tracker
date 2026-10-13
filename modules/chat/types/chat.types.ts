import { BaseEntity } from '@/types/common.types';
import { WorkspaceRole } from '@/modules/workspaces/types/workspace.types';

export interface MediaAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'file';
  sizeBytes: number;
  mimeType?: string;
}

export interface Channel extends BaseEntity {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  memberCount: number;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  workspaceId: string;
  channelId?: string;
  recipientId?: string;
  senderId: string;
  senderName: string;
  senderRole?: WorkspaceRole;
  text: string;
  attachments?: MediaAttachment[];
  timestamp: string;
  isCurrentUser: boolean;
}

export interface CreateChannelPayload {
  name: string;
  description?: string;
  isPrivate?: boolean;
}

export interface SendMessagePayload {
  text: string;
  attachments?: MediaAttachment[];
}
