import { BaseEntity } from '@/types/common.types';

export type WorkspaceRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
export type WorkspacePlan = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface Workspace extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  role: WorkspaceRole;
  memberCount: number;
  projectCount: number;
  taskCount: number;
  plan: WorkspacePlan;
}

export interface CreateWorkspacePayload {
  name: string;
  slug?: string;
  description?: string;
}
