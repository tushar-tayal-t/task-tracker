import { apiClient } from '@/lib/api/client';
import { Workspace, CreateWorkspacePayload } from '../types/workspace.types';
import { mockWorkspaceApi } from './workspace.mock';

export const workspaceApi = {
  /**
   * Fetch all workspaces for the authenticated user
   */
  getWorkspaces: async (): Promise<Workspace[]> => {
    try {
      return await apiClient.get<Workspace[]>('/workspaces');
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[workspaceApi.getWorkspaces] External backend offline -> using mock fallback');
      return mockWorkspaceApi.getWorkspaces();
    }
  },

  /**
   * Fetch single workspace by ID or slug
   */
  getWorkspaceById: async (id: string): Promise<Workspace> => {
    try {
      return await apiClient.get<Workspace>(`/workspaces/${id}`);
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`[workspaceApi.getWorkspaceById] External backend offline -> using mock fallback for id: ${id}`);
      return mockWorkspaceApi.getWorkspaceById(id);
    }
  },

  /**
   * Create a new workspace
   */
  createWorkspace: async (payload: CreateWorkspacePayload): Promise<Workspace> => {
    try {
      return await apiClient.post<Workspace>('/workspaces', payload);
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[workspaceApi.createWorkspace] External backend offline -> using mock fallback');
      return mockWorkspaceApi.createWorkspace(payload);
    }
  },
};
