'use client';

import React, { useState, useRef } from 'react';
import { MediaAttachment, SendMessagePayload } from '../types/chat.types';
import { Button } from '@/components/ui/button';
import {
  Send,
  Paperclip,
  X,
  FileText,
} from 'lucide-react';

interface ChatInputProps {
  placeholder?: string;
  isSending: boolean;
  onSend: (payload: SendMessagePayload) => void;
}

export function ChatInput({ placeholder = 'Type a message...', isSending, onSend }: ChatInputProps) {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<MediaAttachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const fileUrl = URL.createObjectURL(file);

      const newAttachment: MediaAttachment = {
        id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: file.name,
        url: fileUrl,
        type: isImage ? 'image' : 'file',
        sizeBytes: file.size,
        mimeType: file.type,
      };

      setAttachments((prev) => [...prev, newAttachment]);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!text.trim() && attachments.length === 0) || isSending) return;

    onSend({
      text: text.trim(),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    setText('');
    setAttachments([]);
  };

  return (
    <div className="border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Attachment Previews Tray */}
      {attachments.length > 0 && (
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="group relative flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 py-1 pl-2 pr-2.5 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-850 dark:text-zinc-300"
            >
              {att.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={att.url}
                  alt={att.name}
                  className="h-5 w-5 rounded object-cover border border-zinc-300 dark:border-zinc-700"
                />
              ) : (
                <FileText className="h-3.5 w-3.5 text-zinc-500" />
              )}
              <span className="truncate max-w-[130px] text-[11px] font-mono">{att.name}</span>
              <button
                type="button"
                onClick={() => removeAttachment(att.id)}
                className="ml-1 text-zinc-400 hover:text-rose-500 transition cursor-pointer"
                title="Remove attachment"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hidden file picker */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,application/pdf,.doc,.docx,.zip,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Input bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition cursor-pointer"
          title="Attach files or screenshots"
        >
          <Paperclip className="h-3.5 w-3.5" />
        </button>

        <input
          type="text"
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-500 dark:focus:border-zinc-700"
        />

        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={(!text.trim() && attachments.length === 0) || isSending}
          isLoading={isSending}
          leftIcon={<Send className="h-3 w-3" />}
        >
          Send
        </Button>
      </form>
    </div>
  );
}
