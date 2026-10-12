import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 px-4 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-indigo-500/20 duration-1000" />
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
      <p className="mt-4 text-sm font-medium text-zinc-400">Loading TaskTracker...</p>
    </div>
  );
}
