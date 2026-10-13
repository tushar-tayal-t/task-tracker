import { WorkspaceMember, ChatMessage } from '../types/member.types';

export const MOCK_MEMBERS: WorkspaceMember[] = [
  {
    id: 'usr-1',
    name: 'Sarah Connor',
    email: 'sarah@tasktracker.io',
    role: 'ADMIN',
    department: 'Engineering Lead',
    status: 'online',
    assignedTaskCount: 5,
    lastActive: 'Just now',
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z',
  },
  {
    id: 'usr-2',
    name: 'Alex Rivera',
    email: 'alex.rivera@tasktracker.io',
    role: 'OWNER',
    department: 'Product Architecture',
    status: 'online',
    assignedTaskCount: 4,
    lastActive: '2m ago',
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z',
  },
  {
    id: 'usr-3',
    name: 'Devon Vance',
    email: 'devon@tasktracker.io',
    role: 'MEMBER',
    department: 'Frontend Engineering',
    status: 'busy',
    assignedTaskCount: 7,
    lastActive: '15m ago',
    createdAt: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-10-11T00:00:00.000Z',
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'elena@tasktracker.io',
    role: 'MEMBER',
    department: 'UI/UX Design',
    status: 'online',
    assignedTaskCount: 3,
    lastActive: 'Just now',
    createdAt: '2026-03-12T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'usr-5',
    name: 'Marcus Brody',
    email: 'marcus@tasktracker.io',
    role: 'VIEWER',
    department: 'QA & Compliance',
    status: 'offline',
    assignedTaskCount: 2,
    lastActive: '2h ago',
    createdAt: '2026-04-05T00:00:00.000Z',
    updatedAt: '2026-10-09T00:00:00.000Z',
  },
];

export let MOCK_MESSAGES_STORE: Record<string, ChatMessage[]> = {
  'usr-1': [
    {
      id: 'msg-1',
      senderId: 'usr-1',
      senderName: 'Sarah Connor',
      recipientId: 'current-user',
      text: 'Hey! Did you check the high-priority architecture task for the sprint?',
      timestamp: '10:32 AM',
      isCurrentUser: false,
    },
    {
      id: 'msg-2',
      senderId: 'current-user',
      senderName: 'You',
      recipientId: 'usr-1',
      text: 'Yes Sarah, I reviewed it. The domain separation looks solid, ready to push today.',
      timestamp: '10:34 AM',
      isCurrentUser: true,
    },
    {
      id: 'msg-3',
      senderId: 'usr-1',
      senderName: 'Sarah Connor',
      recipientId: 'current-user',
      text: 'Awesome! Let me know as soon as the PR is open so I can approve it.',
      timestamp: '10:35 AM',
      isCurrentUser: false,
    },
  ],
  'usr-3': [
    {
      id: 'msg-4',
      senderId: 'usr-3',
      senderName: 'Devon Vance',
      recipientId: 'current-user',
      text: 'Hey, I am working on the kanban drag-and-drop state right now.',
      timestamp: 'Yesterday',
      isCurrentUser: false,
    },
    {
      id: 'msg-5',
      senderId: 'current-user',
      senderName: 'You',
      recipientId: 'usr-3',
      text: 'Great, make sure TanStack Query handles optimistic cache rollback if API errors.',
      timestamp: 'Yesterday',
      isCurrentUser: true,
    },
  ],
};

export const mockMemberApi = {
  getMembers: async (_workspaceId: string): Promise<WorkspaceMember[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...MOCK_MEMBERS];
  },

  getMemberById: async (_workspaceId: string, memberId: string): Promise<WorkspaceMember> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const member = MOCK_MEMBERS.find((m) => m.id === memberId || m.name.toLowerCase().replace(/\s+/g, '-') === memberId);
    if (!member) {
      throw new Error(`Member with ID "${memberId}" not found`);
    }
    return member;
  },

  getMessages: async (_workspaceId: string, memberId: string): Promise<ChatMessage[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_MESSAGES_STORE[memberId] || [
      {
        id: `msg-welcome-${memberId}`,
        senderId: memberId,
        senderName: 'Team Member',
        recipientId: 'current-user',
        text: 'Hello! Feel free to send me a message regarding tasks or sprint coordination.',
        timestamp: 'Just now',
        isCurrentUser: false,
      },
    ];
  },

  sendMessage: async (_workspaceId: string, memberId: string, text: string): Promise<ChatMessage> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      senderName: 'You',
      recipientId: memberId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };

    if (!MOCK_MESSAGES_STORE[memberId]) {
      MOCK_MESSAGES_STORE[memberId] = [];
    }
    MOCK_MESSAGES_STORE[memberId] = [...MOCK_MESSAGES_STORE[memberId], newMsg];
    return newMsg;
  },
};
