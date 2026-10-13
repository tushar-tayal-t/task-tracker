'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useChannelsQuery } from '@/modules/chat';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  Hash,
  Sparkles,
  ArrowRight,
  Paperclip,
  Users,
} from 'lucide-react';

export default function WorkspaceChatLandingPage() {
  const params = useParams();
  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';

  const { data: channels = [] } = useChannelsQuery(workspaceId);
  const firstChannel = channels[0];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-zinc-950/40">
      <div className="relative mb-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 text-indigo-400 shadow-xl">
          <MessageSquare className="h-8 w-8" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500" />
        </span>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-3">
        <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
        <span>Unified Workspace Collaboration</span>
      </div>

      <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
        Channels, DMs & Media Sharing
      </h2>

      <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
        Select a group channel or team member from the left sidebar to coordinate agile sprint deliverables, share files, and collaborate.
      </p>

      {/* Feature Pills */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
          <Hash className="h-3.5 w-3.5 text-indigo-400" />
          <span>Group Channels</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
          <Users className="h-3.5 w-3.5 text-purple-400" />
          <span>1-on-1 Direct Chat</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
          <Paperclip className="h-3.5 w-3.5 text-emerald-400" />
          <span>Images & Files</span>
        </div>
      </div>

      {/* Fast CTA */}
      {firstChannel && (
        <div className="mt-8">
          <Link href={`/workspaces/${workspaceId}/chat/channels/${firstChannel.id}`}>
            <Button
              variant="glow"
              size="md"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Open #{firstChannel.name}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
