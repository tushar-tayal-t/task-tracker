import { apiClient } from '@/lib/api/client';
import { Workspace, CreateWorkspacePayload } from '../types/workspace.types';
import { mockWorkspaceApi } from './workspace.mock';

export const workspaceApi = {
  /**
   * Fetch all workspaces for the authenticated user
   */
  getWorkspaces: async (): Promise<Workspace[]> => {
    try {
      const response = await apiClient.get<any>('/workspaces');
      if (Array.isArray(response)) {
        return response;
      }
      if (response && Array.isArray(response.data)) {
        return response.data;
      }
      if (response && Array.isArray(response.workspaces)) {
        return response.workspaces;
      }
      return (response as Workspace[]) || [];
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
      const response = await apiClient.get<any>(`/workspaces/${id}`);
      if (response && response.data) {
        return response.data;
      }
      if (response && response.workspace) {
        return response.workspace;
      }
      return response as Workspace;
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
      const response = await apiClient.post<any>('/workspaces', payload);
      if (response && response.data) {
        return response.data;
      }
      if (response && response.workspace) {
        return response.workspace;
      }
      return response as Workspace;
    } catch {
      // eslint-disable-next-line no-console
      console.warn('[workspaceApi.createWorkspace] External backend offline -> using mock fallback');
      return mockWorkspaceApi.createWorkspace(payload);
    }
  },
};
