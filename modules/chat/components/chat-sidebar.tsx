'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useChannelsQuery } from '../api/chat.queries';
import { useMembersQuery } from '@/modules/members';
import { CreateChannelModal } from './create-channel-modal';
import { getInitials } from '@/lib/utils';
import {
  Hash,
  Lock,
  Plus,
  Search,
} from 'lucide-react';

interface ChatSidebarProps {
  workspaceId: string;
}

export function ChatSidebar({ workspaceId }: ChatSidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: channels = [], isLoading: channelsLoading } = useChannelsQuery(workspaceId);
  const { data: members = [], isLoading: membersLoading } = useMembersQuery(workspaceId);

  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-amber-500',
    offline: 'bg-zinc-400 dark:bg-zinc-600',
  };

  return (
    <>
      <aside className="w-full sm:w-64 shrink-0 border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 flex flex-col h-[650px] overflow-hidden">
        {/* Search Header */}
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Find channel or person..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Scrollable Channels & DMs */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-5 scrollbar-thin">
          {/* Group Channels Section */}
          <div>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Channels
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex h-5 w-5 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-850 dark:hover:text-white transition cursor-pointer"
                title="Create Group Channel"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-0.5">
              {channelsLoading ? (
                <div className="space-y-1.5 px-2">
                  <div className="h-6 rounded-md bg-zinc-200/60 dark:bg-zinc-800/40 animate-pulse" />
                  <div className="h-6 rounded-md bg-zinc-200/60 dark:bg-zinc-800/40 animate-pulse" />
                </div>
              ) : filteredChannels.length === 0 ? (
                <p className="px-2 py-1 text-[11px] text-zinc-400 italic">No channels</p>
              ) : (
                filteredChannels.map((chn) => {
                  const href = `/workspaces/${workspaceId}/chat/channels/${chn.id}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={chn.id}
                      href={href}
                      className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition ${
                        isActive
                          ? 'bg-zinc-200/80 text-zinc-900 dark:bg-zinc-800 dark:text-white font-semibold'
                          : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {chn.isPrivate ? (
                          <Lock className="h-3 w-3 shrink-0 text-zinc-400" />
                        ) : (
                          <Hash className="h-3 w-3 shrink-0 text-zinc-400" />
                        )}
                        <span className="truncate">{chn.name}</span>
                      </div>

                      {chn.unreadCount && chn.unreadCount > 0 && !isActive ? (
                        <span className="rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-1.5 py-0.2 text-[9px] font-bold">
                          {chn.unreadCount}
                        </span>
                      ) : null}
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Direct Messages Section */}
          <div>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Direct Messages
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {members.length}
              </span>
            </div>

            <div className="space-y-0.5">
              {membersLoading ? (
                <div className="space-y-1.5 px-2">
                  <div className="h-6 rounded-md bg-zinc-200/60 dark:bg-zinc-800/40 animate-pulse" />
                  <div className="h-6 rounded-md bg-zinc-200/60 dark:bg-zinc-800/40 animate-pulse" />
                </div>
              ) : filteredMembers.length === 0 ? (
                <p className="px-2 py-1 text-[11px] text-zinc-400 italic">No members</p>
              ) : (
                filteredMembers.map((member) => {
                  const href = `/workspaces/${workspaceId}/chat/dm/${member.id}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={member.id}
                      href={href}
                      className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition ${
                        isActive
                          ? 'bg-zinc-200/80 text-zinc-900 dark:bg-zinc-800 dark:text-white font-semibold'
                          : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div className="relative shrink-0">
                          <div className="flex h-5 w-5 items-center justify-center rounded-md border border-zinc-300 bg-zinc-200 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 text-[9px] font-bold">
                            {getInitials(member.name)}
                          </div>
                          <span
                            className={`absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full border border-white dark:border-zinc-950 ${
                              statusColors[member.status]
                            }`}
                          />
                        </div>

                        <span className="truncate leading-tight">{member.name}</span>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </aside>

      <CreateChannelModal
        workspaceId={workspaceId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
