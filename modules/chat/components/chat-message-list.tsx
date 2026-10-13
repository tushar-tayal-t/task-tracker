'use client';

import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types/chat.types';
import {
  FileText,
  Download,
  Image as ImageIcon,
  CheckCheck,
} from 'lucide-react';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-5 space-y-3.5">
        <div className="h-10 w-60 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 animate-pulse" />
        <div className="h-14 w-72 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 animate-pulse ml-auto" />
        <div className="h-10 w-44 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 animate-pulse" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-500 mb-2.5">
          <ImageIcon className="h-5 w-5" />
        </div>
        <h3 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">No messages yet</h3>
        <p className="mt-1 text-[11px] text-zinc-400 max-w-xs leading-relaxed">
          Start the conversation below. You can send text messages or attach files and screenshots.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 scrollbar-thin">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}
        >
          {/* Sender Header for other members */}
          {!msg.isCurrentUser && (
            <div className="flex items-center gap-2 mb-1 pl-1">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{msg.senderName}</span>
              {msg.senderRole && (
                <span className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.2 text-[9px] font-mono text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                  {msg.senderRole}
                </span>
              )}
            </div>
          )}

          {/* Bubble */}
          <div
            className={`max-w-md rounded-xl p-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
              msg.isCurrentUser
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-medium'
                : 'border border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-850 dark:text-zinc-100'
            }`}
          >
            {/* Message Text */}
            {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}

            {/* Media Attachments */}
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="mt-2.5 space-y-2">
                {msg.attachments.map((att) => {
                  if (att.type === 'image') {
                    return (
                      <div key={att.id} className="overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={att.url}
                          alt={att.name}
                          className="max-h-56 w-full object-cover rounded-lg hover:opacity-95 transition cursor-pointer"
                          onClick={() => window.open(att.url, '_blank')}
                        />
                        <div className="p-1 bg-black/60 text-[10px] text-white truncate font-mono">
                          {att.name} ({formatFileSize(att.sizeBytes)})
                        </div>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={att.id}
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between gap-3 rounded-lg border p-2 text-xs transition ${
                        msg.isCurrentUser
                          ? 'border-zinc-700 bg-zinc-800 text-white dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-900'
                          : 'border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="h-4 w-4 shrink-0 text-zinc-400" />
                        <div className="truncate text-left">
                          <span className="block font-medium truncate">{att.name}</span>
                          <span className="block text-[10px] font-mono text-zinc-400">
                            {formatFileSize(att.sizeBytes)}
                          </span>
                        </div>
                      </div>
                      <Download className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Timestamp */}
          <div className="mt-1 flex items-center gap-1.5 px-1 text-[10px] text-zinc-400">
            <span>{msg.timestamp}</span>
            {msg.isCurrentUser && <CheckCheck className="h-3 w-3" />}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
