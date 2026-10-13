'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ChatSidebar } from '@/modules/chat';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceChatLayout({ children }: ChatLayoutProps) {
  const params = useParams();
  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';

  return (
    <div className="flex flex-col sm:flex-row h-[650px] rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden shadow-xs">
      {/* Left Channels & DMs Sidebar */}
      <ChatSidebar workspaceId={workspaceId} />

      {/* Right Conversation Window */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-zinc-900 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
