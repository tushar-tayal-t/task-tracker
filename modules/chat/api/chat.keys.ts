export const chatKeys = {
  all: ['chat'] as const,
  channels: (workspaceId: string) => [...chatKeys.all, 'channels', workspaceId] as const,
  channelDetail: (workspaceId: string, channelId: string) => [...chatKeys.channels(workspaceId), channelId] as const,
  channelMessages: (workspaceId: string, channelId: string) => [...chatKeys.all, 'channel-messages', workspaceId, channelId] as const,
  dmMessages: (workspaceId: string, memberId: string) => [...chatKeys.all, 'dm-messages', workspaceId, memberId] as const,
};
