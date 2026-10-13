import { Channel, ChatMessage, CreateChannelPayload, SendMessagePayload } from '../types/chat.types';

export let MOCK_CHANNELS: Channel[] = [
  {
    id: 'chn-001',
    workspaceId: 'ws-001',
    name: 'general',
    description: 'Workspace-wide company announcements and general updates',
    isPrivate: false,
    memberCount: 18,
    unreadCount: 0,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'chn-002',
    workspaceId: 'ws-001',
    name: 'sprint-deliverables',
    description: 'Sprint planning, blocker resolution, and PR reviews',
    isPrivate: false,
    memberCount: 8,
    unreadCount: 2,
    createdAt: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-10-11T00:00:00.000Z',
  },
  {
    id: 'chn-003',
    workspaceId: 'ws-001',
    name: 'backend-engineers',
    description: 'API design, database schemas, and microservice discussion',
    isPrivate: true,
    memberCount: 5,
    unreadCount: 0,
    createdAt: '2026-03-10T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z',
  },
  {
    id: 'chn-004',
    workspaceId: 'ws-001',
    name: 'ui-ux-design',
    description: 'Figma prototypes, design critique, and component tokens',
    isPrivate: false,
    memberCount: 6,
    unreadCount: 1,
    createdAt: '2026-04-05T00:00:00.000Z',
    updatedAt: '2026-10-09T00:00:00.000Z',
  },
];

export let MOCK_CHANNEL_MESSAGES: Record<string, ChatMessage[]> = {
  'chn-001': [
    {
      id: 'cmsg-101',
      workspaceId: 'ws-001',
      channelId: 'chn-001',
      senderId: 'usr-1',
      senderName: 'Sarah Connor',
      senderRole: 'ADMIN',
      text: 'Welcome team! Please review the sprint roadmap document attached below.',
      attachments: [
        {
          id: 'att-1',
          name: 'Sprint-Q4-Roadmap.pdf',
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          type: 'file',
          sizeBytes: 2450000,
          mimeType: 'application/pdf',
        },
      ],
      timestamp: 'Yesterday at 11:20 AM',
      isCurrentUser: false,
    },
    {
      id: 'cmsg-102',
      workspaceId: 'ws-001',
      channelId: 'chn-001',
      senderId: 'usr-2',
      senderName: 'Alex Rivera',
      senderRole: 'OWNER',
      text: 'Thanks Sarah. Here is the revised architectural diagram for the new permissions engine:',
      attachments: [
        {
          id: 'att-2',
          name: 'System-Architecture-v2.png',
          url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
          type: 'image',
          sizeBytes: 1850000,
          mimeType: 'image/png',
        },
      ],
      timestamp: 'Yesterday at 2:45 PM',
      isCurrentUser: false,
    },
    {
      id: 'cmsg-103',
      workspaceId: 'ws-001',
      channelId: 'chn-001',
      senderId: 'current-user',
      senderName: 'You',
      text: 'Looks awesome! I am tackling the assigned task for the workspace API today.',
      timestamp: 'Today at 9:15 AM',
      isCurrentUser: true,
    },
  ],
  'chn-002': [
    {
      id: 'cmsg-201',
      workspaceId: 'ws-001',
      channelId: 'chn-002',
      senderId: 'usr-3',
      senderName: 'Devon Vance',
      senderRole: 'MEMBER',
      text: 'Sprint review is on track. I just pushed the kanban board updates.',
      timestamp: '10:10 AM',
      isCurrentUser: false,
    },
  ],
};

export let MOCK_DM_MESSAGES: Record<string, ChatMessage[]> = {
  'usr-1': [
    {
      id: 'dm-101',
      workspaceId: 'ws-001',
      recipientId: 'current-user',
      senderId: 'usr-1',
      senderName: 'Sarah Connor',
      senderRole: 'ADMIN',
      text: 'Hey! Did you check the high-priority architecture task for the sprint?',
      timestamp: '10:32 AM',
      isCurrentUser: false,
    },
    {
      id: 'dm-102',
      workspaceId: 'ws-001',
      recipientId: 'usr-1',
      senderId: 'current-user',
      senderName: 'You',
      text: 'Yes Sarah, I reviewed it. Attached the test specs.',
      attachments: [
        {
          id: 'att-dm-1',
          name: 'Sprint-Test-Specs.docx',
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          type: 'file',
          sizeBytes: 540000,
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
      ],
      timestamp: '10:34 AM',
      isCurrentUser: true,
    },
  ],
};

export const mockChatApi = {
  getChannels: async (workspaceId: string): Promise<Channel[]> => {
    await new Promise((r) => setTimeout(r, 150));
    return MOCK_CHANNELS.filter((c) => c.workspaceId === workspaceId || true);
  },

  getChannelById: async (_workspaceId: string, channelId: string): Promise<Channel> => {
    await new Promise((r) => setTimeout(r, 100));
    const chn = MOCK_CHANNELS.find((c) => c.id === channelId || c.name === channelId);
    if (!chn) throw new Error(`Channel "${channelId}" not found`);
    return chn;
  },

  createChannel: async (workspaceId: string, payload: CreateChannelPayload): Promise<Channel> => {
    await new Promise((r) => setTimeout(r, 200));
    const cleanName = payload.name.toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
    const newChn: Channel = {
      id: `chn-${Date.now().toString().slice(-4)}`,
      workspaceId,
      name: cleanName,
      description: payload.description || '',
      isPrivate: Boolean(payload.isPrivate),
      memberCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_CHANNELS = [...MOCK_CHANNELS, newChn];
    return newChn;
  },

  getChannelMessages: async (_workspaceId: string, channelId: string): Promise<ChatMessage[]> => {
    await new Promise((r) => setTimeout(r, 150));
    return MOCK_CHANNEL_MESSAGES[channelId] || [];
  },

  sendChannelMessage: async (
    workspaceId: string,
    channelId: string,
    payload: SendMessagePayload
  ): Promise<ChatMessage> => {
    await new Promise((r) => setTimeout(r, 150));
    const msg: ChatMessage = {
      id: `cmsg-${Date.now()}`,
      workspaceId,
      channelId,
      senderId: 'current-user',
      senderName: 'You',
      text: payload.text,
      attachments: payload.attachments,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };
    if (!MOCK_CHANNEL_MESSAGES[channelId]) {
      MOCK_CHANNEL_MESSAGES[channelId] = [];
    }
    MOCK_CHANNEL_MESSAGES[channelId] = [...MOCK_CHANNEL_MESSAGES[channelId], msg];
    return msg;
  },

  getDmMessages: async (_workspaceId: string, memberId: string): Promise<ChatMessage[]> => {
    await new Promise((r) => setTimeout(r, 150));
    return MOCK_DM_MESSAGES[memberId] || [];
  },

  sendDmMessage: async (
    workspaceId: string,
    memberId: string,
    payload: SendMessagePayload
  ): Promise<ChatMessage> => {
    await new Promise((r) => setTimeout(r, 150));
    const msg: ChatMessage = {
      id: `dm-${Date.now()}`,
      workspaceId,
      recipientId: memberId,
      senderId: 'current-user',
      senderName: 'You',
      text: payload.text,
      attachments: payload.attachments,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };
    if (!MOCK_DM_MESSAGES[memberId]) {
      MOCK_DM_MESSAGES[memberId] = [];
    }
    MOCK_DM_MESSAGES[memberId] = [...MOCK_DM_MESSAGES[memberId], msg];
    return msg;
  },
};
