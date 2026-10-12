'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      theme="dark"
      richColors
      closeButton
      toastOptions={{
        className: 'border border-zinc-800 bg-zinc-950 text-zinc-100 font-sans shadow-xl',
        duration: 4000,
      }}
    />
  );
}
