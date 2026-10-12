import { Task, TaskFilterOptions, TaskStats } from '../types/task.types';

// In-memory mock task dataset for frontend development
export let MOCK_TASKS_DATA: Task[] = [
  {
    id: 'tsk-001',
    title: 'Architect Domain-Driven Modular Engine',
    description: 'Implement clean separation of concerns with feature modules and technical core.',
    status: 'COMPLETED',
    priority: 'URGENT',
    projectId: 'prj-101',
    projectName: 'Core Engine v1',
    assignee: {
      id: 'usr-1',
      name: 'Sarah Connor',
      email: 'sarah@tasktracker.io',
      role: 'ADMIN',
    },
    dueDate: '2026-10-15',
    tags: ['Architecture', 'Scalability'],
    createdAt: '2026-10-01',
    updatedAt: '2026-10-10',
  },
  {
    id: 'tsk-002',
    title: 'Implement Granular RBAC Permissions Engine',
    description: 'Provide hierarchical role authorization across admin, manager, member, and viewer levels.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    projectId: 'prj-101',
    projectName: 'Security Layer',
    assignee: {
      id: 'usr-2',
      name: 'Alex Rivera',
      email: 'alex.rivera@tasktracker.io',
      role: 'MANAGER',
    },
    dueDate: '2026-10-18',
    tags: ['Security', 'RBAC', 'Auth'],
    createdAt: '2026-10-02',
    updatedAt: '2026-10-11',
  },
  {
    id: 'tsk-003',
    title: 'Build Real-Time Kanban Sprint Board',
    description: 'Smooth drag-and-drop task movements with TanStack Query optimistic updates.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    projectId: 'prj-102',
    projectName: 'Frontend UI',
    assignee: {
      id: 'usr-3',
      name: 'Devon Vance',
      email: 'devon@tasktracker.io',
      role: 'MEMBER',
    },
    dueDate: '2026-10-20',
    tags: ['UI/UX', 'Kanban'],
    createdAt: '2026-10-04',
    updatedAt: '2026-10-11',
  },
  {
    id: 'tsk-004',
    title: 'Automated Burndown & Velocity Analytics',
    description: 'Compute team cycle times, sprint story completion, and automated weekly digests.',
    status: 'TODO',
    priority: 'MEDIUM',
    projectId: 'prj-103',
    projectName: 'Telemetry',
    assignee: {
      id: 'usr-4',
      name: 'Elena Rostova',
      email: 'elena@tasktracker.io',
      role: 'MEMBER',
    },
    dueDate: '2026-10-25',
    tags: ['Analytics', 'Reports'],
    createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
  },
  {
    id: 'tsk-005',
    title: 'Connect Dynamic Route Handlers with Zod Validation',
    description: 'Ensure low-latency REST endpoints for task CRUD operations with zod validations.',
    status: 'IN_REVIEW',
    priority: 'HIGH',
    projectId: 'prj-101',
    projectName: 'API Layer',
    assignee: {
      id: 'usr-1',
      name: 'Sarah Connor',
      email: 'sarah@tasktracker.io',
      role: 'ADMIN',
    },
    dueDate: '2026-10-17',
    tags: ['Next.js', 'API'],
    createdAt: '2026-10-03',
    updatedAt: '2026-10-11',
  },
];

export const mockTaskApi = {
  /**
   * Mock get all tasks
   */
  getTasks: async (filters?: TaskFilterOptions): Promise<Task[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    let results = [...MOCK_TASKS_DATA];

    if (filters?.status && filters.status !== 'ALL') {
      results = results.filter((t) => t.status === filters.status);
    }
    if (filters?.priority && filters.priority !== 'ALL') {
      results = results.filter((t) => t.priority === filters.priority);
    }
    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }

    return results;
  },

  /**
   * Mock get task by id
   */
  getTaskById: async (id: string): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const found = MOCK_TASKS_DATA.find((t) => t.id === id);
    if (!found) {
      return MOCK_TASKS_DATA[0];
    }
    return found;
  },

  /**
   * Mock create task
   */
  createTask: async (payload: Partial<Task>): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const newTask: Task = {
      id: `tsk-${Date.now().toString().slice(-4)}`,
      title: payload.title || 'New Task',
      description: payload.description || '',
      status: payload.status || 'TODO',
      priority: payload.priority || 'MEDIUM',
      projectId: payload.projectId || 'prj-101',
      projectName: payload.projectName || 'Active Sprint',
      dueDate: payload.dueDate || new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10),
      tags: payload.tags || ['Task'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignee: {
        id: 'usr-101',
        name: 'Alex Rivera',
        email: 'alex.rivera@tasktracker.io',
        role: 'MANAGER',
      },
    };

    MOCK_TASKS_DATA = [newTask, ...MOCK_TASKS_DATA];
    return newTask;
  },

  /**
   * Mock update task
   */
  updateTask: async (id: string, payload: Partial<Task>): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    MOCK_TASKS_DATA = MOCK_TASKS_DATA.map((t) =>
      t.id === id ? { ...t, ...payload, updatedAt: new Date().toISOString() } : t
    );

    return MOCK_TASKS_DATA.find((t) => t.id === id) || (payload as Task);
  },

  /**
   * Mock delete task
   */
  deleteTask: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    MOCK_TASKS_DATA = MOCK_TASKS_DATA.filter((t) => t.id !== id);
  },

  /**
   * Mock aggregate stats
   */
  getTaskStats: async (): Promise<TaskStats> => {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const total = MOCK_TASKS_DATA.length;
    const completed = MOCK_TASKS_DATA.filter((t) => t.status === 'COMPLETED').length;
    const inProgress = MOCK_TASKS_DATA.filter((t) => t.status === 'IN_PROGRESS').length;
    const todo = MOCK_TASKS_DATA.filter((t) => t.status === 'TODO').length;
    const urgent = MOCK_TASKS_DATA.filter((t) => t.priority === 'URGENT').length;

    return { total, completed, inProgress, todo, urgent };
  },
};
