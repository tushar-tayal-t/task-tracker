'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateChannelMutation } from '../api/chat.queries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Hash, Lock, Plus } from 'lucide-react';

interface CreateChannelModalProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CreateChannelModal({ workspaceId, isOpen, onClose }: CreateChannelModalProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const createMutation = useCreateChannelMutation(workspaceId, {
    onSuccess: (newChn) => {
      toast.success(`Group channel #${newChn.name} created!`);
      setName('');
      setDescription('');
      setIsPrivate(false);
      onClose();
      router.push(`/workspaces/${workspaceId}/chat/channels/${newChn.id}`);
    },
    onError: () => {
      toast.error('Failed to create group channel. Please try again.');
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter a channel name');
      return;
    }
    createMutation.mutate({
      name: name.trim(),
      description: description.trim(),
      isPrivate,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Hash className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Create Group Channel</h2>
            <p className="text-xs text-zinc-400">Create a collaborative group for your workspace team</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="channel-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
              Channel Name *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-zinc-500 text-sm font-mono">#</span>
              <Input
                id="channel-name"
                placeholder="e.g. sprint-planning"
                value={name}
                onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="pl-8"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label htmlFor="channel-desc" className="block text-xs font-medium text-zinc-300 mb-1.5">
              Description (Optional)
            </label>
            <textarea
              id="channel-desc"
              rows={2}
              placeholder="What is this channel or group about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
            <div className="flex items-center gap-2.5">
              <Lock className="h-4 w-4 text-zinc-400" />
              <div>
                <span className="text-xs font-medium text-zinc-200 block">Make Private</span>
                <span className="text-[11px] text-zinc-500 block">Only invited members can view this channel</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="glow"
              size="sm"
              isLoading={createMutation.isPending}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Create Channel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
