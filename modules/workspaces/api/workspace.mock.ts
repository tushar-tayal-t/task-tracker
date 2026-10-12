import { Workspace, CreateWorkspacePayload } from '../types/workspace.types';

export let MOCK_WORKSPACES: Workspace[] = [
  {
    id: 'ws-001',
    name: 'Acme Corp Sprint Hub',
    slug: 'acme-corp',
    description: 'Primary engineering workspace for core product agile sprints and milestones.',
    role: 'OWNER',
    memberCount: 18,
    projectCount: 6,
    taskCount: 42,
    plan: 'PRO',
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'ws-002',
    name: 'Dev Team Alpha',
    slug: 'dev-team-alpha',
    description: 'Cross-functional infrastructure and platform engineering team workspace.',
    role: 'ADMIN',
    memberCount: 8,
    projectCount: 4,
    taskCount: 19,
    plan: 'PRO',
    createdAt: '2026-03-20T00:00:00.000Z',
    updatedAt: '2026-10-11T00:00:00.000Z',
  },
  {
    id: 'ws-003',
    name: 'Freelance Client Portal',
    slug: 'freelance-client-portal',
    description: 'External client deliverables, sprint reviews, and feedback tickets.',
    role: 'MEMBER',
    memberCount: 3,
    projectCount: 2,
    taskCount: 7,
    plan: 'FREE',
    createdAt: '2026-07-05T00:00:00.000Z',
    updatedAt: '2026-10-08T00:00:00.000Z',
  },
];

export const mockWorkspaceApi = {
  getWorkspaces: async (): Promise<Workspace[]> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return [...MOCK_WORKSPACES];
  },

  getWorkspaceById: async (id: string): Promise<Workspace> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const found = MOCK_WORKSPACES.find((w) => w.id === id || w.slug === id);
    return found || MOCK_WORKSPACES[0];
  },

  createWorkspace: async (payload: CreateWorkspacePayload): Promise<Workspace> => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const slug = payload.slug || payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newWs: Workspace = {
      id: `ws-${Date.now().toString().slice(-4)}`,
      name: payload.name,
      slug,
      description: payload.description || '',
      role: 'OWNER',
      memberCount: 1,
      projectCount: 0,
      taskCount: 0,
      plan: 'FREE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_WORKSPACES = [newWs, ...MOCK_WORKSPACES];
    return newWs;
  },
};
