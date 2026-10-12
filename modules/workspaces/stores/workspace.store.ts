import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workspace } from '../types/workspace.types';

interface WorkspaceState {
  activeWorkspace: Workspace | null;
  setActiveWorkspace: (workspace: Workspace) => void;
  clearActiveWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      activeWorkspace: null,
      setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
      clearActiveWorkspace: () => set({ activeWorkspace: null }),
    }),
    {
      name: 'active-workspace-storage',
    }
  )
);
