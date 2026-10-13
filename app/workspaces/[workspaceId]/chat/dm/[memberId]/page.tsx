'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import {
  useDmMessagesQuery,
  useSendDmMessageMutation,
  ChatMessageList,
  ChatInput,
  SendMessagePayload,
} from '@/modules/chat';
import { useMemberDetailQuery } from '@/modules/members';
import { getInitials } from '@/lib/utils';
import { Crown, AlertTriangle } from 'lucide-react';

export default function DirectMessageChatPage() {
  const params = useParams();
  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';
  const memberId = typeof params?.memberId === 'string' ? params.memberId : '';

  const {
    data: member,
    isLoading: memberLoading,
    error: memberError,
  } = useMemberDetailQuery(workspaceId, memberId);

  const {
    data: messages = [],
    isLoading: messagesLoading,
  } = useDmMessagesQuery(workspaceId, memberId);

  const sendMutation = useSendDmMessageMutation(workspaceId, memberId);

  const handleSend = (payload: SendMessagePayload) => {
    sendMutation.mutate(payload);
  };

  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-amber-500',
    offline: 'bg-zinc-600',
  };

  if (memberError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 mb-3">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-bold text-white">Member Not Found</h3>
        <p className="mt-1 text-xs text-zinc-400">
          The team member <code className="text-indigo-300 font-mono">{memberId}</code> does not exist in this workspace.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* DM Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/70 px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {memberLoading ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-zinc-800 animate-pulse" />
              <div className="space-y-1">
                <div className="h-3.5 w-24 rounded bg-zinc-800 animate-pulse" />
                <div className="h-2.5 w-16 rounded bg-zinc-800 animate-pulse" />
              </div>
            </div>
          ) : member ? (
            <>
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
                  {getInitials(member.name)}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-zinc-950 ${
                    statusColors[member.status]
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white leading-tight">
                    {member.name}
                  </h2>
                  {member.role === 'OWNER' && <Crown className="h-3 w-3 text-amber-400" />}
                </div>
                <p className="text-[11px] text-zinc-400">
                  {member.department} &bull; <span className="capitalize">{member.status}</span>
                </p>
              </div>
            </>
          ) : null}
        </div>

        <div className="text-xs text-zinc-500 font-mono">
          <span>Direct Message</span>
        </div>
      </div>

      {/* Messages Feed */}
      <ChatMessageList
        messages={messages}
        isLoading={messagesLoading || memberLoading}
      />

      {/* Input bar with file/image attachments */}
      <ChatInput
        placeholder={`Message ${member?.name || 'team member'}... (press Enter to send)`}
        isSending={sendMutation.isPending}
        onSend={handleSend}
      />
    </div>
  );
}
