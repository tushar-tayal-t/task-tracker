export const memberKeys = {
  all: ['members'] as const,
  lists: (workspaceId?: string) => [...memberKeys.all, 'list', workspaceId] as const,
  detail: (workspaceId: string, memberId: string) => [...memberKeys.all, 'detail', workspaceId, memberId] as const,
  messages: (workspaceId: string, memberId: string) => [...memberKeys.all, 'messages', workspaceId, memberId] as const,
};
