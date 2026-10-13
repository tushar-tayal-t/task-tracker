'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import {
  useChannelDetailQuery,
  useChannelMessagesQuery,
  useSendChannelMessageMutation,
  ChatMessageList,
  ChatInput,
  SendMessagePayload,
} from '@/modules/chat';
import {
  Hash,
  Lock,
  Users,
  AlertTriangle,
} from 'lucide-react';

export default function ChannelChatPage() {
  const params = useParams();
  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';
  const channelId = typeof params?.channelId === 'string' ? params.channelId : '';

  const {
    data: channel,
    isLoading: channelLoading,
    error: channelError,
  } = useChannelDetailQuery(workspaceId, channelId);

  const {
    data: messages = [],
    isLoading: messagesLoading,
  } = useChannelMessagesQuery(workspaceId, channelId);

  const sendMutation = useSendChannelMessageMutation(workspaceId, channelId);

  const handleSend = (payload: SendMessagePayload) => {
    sendMutation.mutate(payload);
  };

  if (channelError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 mb-3">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-bold text-white">Channel Not Found</h3>
        <p className="mt-1 text-xs text-zinc-400">
          The channel <code className="text-indigo-300 font-mono">{channelId}</code> does not exist or has been archived.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Channel Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/70 px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5 truncate">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {channel?.isPrivate ? <Lock className="h-4 w-4" /> : <Hash className="h-4 w-4" />}
          </div>

          <div className="truncate">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white leading-tight truncate">
                #{channel?.name || channelId}
              </h2>
              {channel?.isPrivate && (
                <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.2 text-[9px] font-mono text-zinc-400">
                  Private
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 truncate max-w-md">
              {channel?.description || 'Group channel for team collaboration and task discussion.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-1">
            <Users className="h-3.5 w-3.5 text-zinc-500" />
            <span>{channel?.memberCount || 1} members</span>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <ChatMessageList
        messages={messages}
        isLoading={messagesLoading || channelLoading}
      />

      {/* Input bar with file/image attachments */}
      <ChatInput
        placeholder={`Message #${channel?.name || 'channel'}... (press Enter to send)`}
        isSending={sendMutation.isPending}
        onSend={handleSend}
      />
    </div>
  );
}
