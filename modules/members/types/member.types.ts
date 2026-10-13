import { BaseEntity, UserSummary } from '@/types/common.types';
import { WorkspaceRole } from '@/modules/workspaces/types/workspace.types';

export interface WorkspaceMember extends BaseEntity {
  id: string;
  name: string;
  email: string;
  role: WorkspaceRole;
  department: string;
  avatarUrl?: string;
  status: 'online' | 'busy' | 'offline';
  assignedTaskCount: number;
  lastActive: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
}

export interface SendMessagePayload {
  recipientId: string;
  text: string;
}
