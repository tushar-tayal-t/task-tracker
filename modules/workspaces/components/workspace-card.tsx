'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Workspace } from '../types/workspace.types';
import { useWorkspaceStore } from '../stores/workspace.store';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import {
  Briefcase,
  Users,
  FolderGit2,
  CheckSquare2,
  ArrowRight,
  Shield,
  Crown,
} from 'lucide-react';

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();
  const setActiveWorkspace = useWorkspaceStore((state) => state.setActiveWorkspace);

  const handleSelect = () => {
    setActiveWorkspace(workspace);
    router.push(APP_CONFIG.routes.workspaceDetail(workspace.id));
  };

  const roleBadgeStyles = {
    OWNER: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    ADMIN: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
    MEMBER: 'border-zinc-700 bg-zinc-800 text-zinc-300',
    VIEWER: 'border-zinc-800 bg-zinc-900 text-zinc-400',
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl transition-all duration-200 hover:border-indigo-500/50 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-indigo-500/10">
      <div>
        {/* Top bar with icon and badges */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 text-indigo-400 shadow-inner group-hover:scale-105 transition-transform">
            <Briefcase className="h-6 w-6" />
          </div>

          <div className="flex items-center gap-2">
            {workspace.role === 'OWNER' && (
              <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                <Crown className="h-3 w-3" />
                Owner
              </span>
            )}
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                roleBadgeStyles[workspace.role]
              }`}
            >
              {workspace.role}
            </span>
          </div>
        </div>

        {/* Workspace Name & Description */}
        <div className="mt-5">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
            {workspace.name}
          </h3>
          <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed line-clamp-2">
            {workspace.description || 'Workspace collaboration hub for sprint goals and tasks.'}
          </p>
        </div>

        {/* Metric Pills */}
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-zinc-800/80 pt-4 text-center">
          <div className="rounded-lg bg-zinc-950/60 p-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500">
              <FolderGit2 className="h-3 w-3 text-indigo-400" />
              <span>Projects</span>
            </div>
            <div className="mt-1 text-sm font-bold text-zinc-200">
              {workspace.projectCount}
            </div>
          </div>

          <div className="rounded-lg bg-zinc-950/60 p-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500">
              <CheckSquare2 className="h-3 w-3 text-emerald-400" />
              <span>Tasks</span>
            </div>
            <div className="mt-1 text-sm font-bold text-zinc-200">
              {workspace.taskCount}
            </div>
          </div>

          <div className="rounded-lg bg-zinc-950/60 p-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500">
              <Users className="h-3 w-3 text-purple-400" />
              <span>Members</span>
            </div>
            <div className="mt-1 text-sm font-bold text-zinc-200">
              {workspace.memberCount}
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-6 pt-2">
        <Button
          onClick={handleSelect}
          variant="primary"
          className="w-full justify-between"
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Enter Workspace
        </Button>
      </div>
    </div>
  );
}
