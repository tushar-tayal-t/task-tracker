'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMembersQuery } from '@/modules/members';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/lib/utils';
import {
  Users,
  MessageSquare,
  Search,
  CheckSquare2,
  Clock,
} from 'lucide-react';

export default function WorkspaceMembersPage() {
  const params = useParams();
  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';

  const [searchQuery, setSearchQuery] = useState('');

  const { data: members = [], isLoading, isFetching } = useMembersQuery(workspaceId);

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  const roleStyles = {
    OWNER: 'border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white',
    ADMIN: 'border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
    MEMBER: 'border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-400',
    VIEWER: 'border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-500',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-amber-500',
    offline: 'bg-zinc-400 dark:bg-zinc-600',
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Team Members
            </h1>
            {isFetching && !isLoading && (
              <span className="text-[11px] font-mono text-zinc-400">
                Updating...
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Collaborator permissions and direct messaging in workspace <code className="font-mono text-zinc-700 dark:text-zinc-300">{workspaceId}</code>
          </p>
        </div>

        <div className="text-xs text-zinc-500 font-mono">
          <span>{filteredMembers.length} active collaborators</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name, email, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Members Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-40 rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 animate-pulse" />
          ))}
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 p-10 text-center">
          <Users className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="mt-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">No members found</h3>
          <p className="mt-1 text-xs text-zinc-500">
            {searchQuery ? 'Try clearing your search query.' : 'Invite collaborators to your workspace.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
            >
              <div>
                {/* Header with Avatar and Online Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-200 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white text-xs font-bold">
                        {getInitials(member.name)}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-zinc-900 ${
                          statusColors[member.status]
                        }`}
                        title={`Status: ${member.status}`}
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-[11px] text-zinc-500">{member.department}</p>
                    </div>
                  </div>

                  <span
                    className={`rounded border px-1.5 py-0.2 text-[10px] font-mono font-medium ${
                      roleStyles[member.role]
                    }`}
                  >
                    {member.role}
                  </span>
                </div>

                <div className="mt-3 text-xs text-zinc-500 font-mono truncate">
                  {member.email}
                </div>

                {/* Member stats */}
                <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-2.5 text-xs text-zinc-500 dark:border-zinc-800/80">
                  <div className="flex items-center gap-1.5">
                    <CheckSquare2 className="h-3 w-3 text-zinc-400" />
                    <span>{member.assignedTaskCount} tasks</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Clock className="h-3 w-3 text-zinc-400" />
                    <span>{member.lastActive}</span>
                  </div>
                </div>
              </div>

              {/* Chat Action Button */}
              <div className="mt-4 pt-1">
                <Link href={`/workspaces/${workspaceId}/chat/dm/${member.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                    leftIcon={<MessageSquare className="h-3.5 w-3.5 text-zinc-500" />}
                  >
                    Direct Chat
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
