import type { Metadata } from 'next';
import { LoginForm } from '@/modules/auth';
import { CheckSquare2 } from 'lucide-react';
import { APP_CONFIG } from '@/config/app.config';

export const metadata: Metadata = {
  title: 'Sign In',
  description: `Sign in to your ${APP_CONFIG.name} account to manage sprint tasks and projects.`,
};

export default function LoginPage() {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4 shadow-inner">
          <CheckSquare2 className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400">
          Enter your credentials to access your sprint workspaces
        </p>
      </div>

      {/* Form Component */}
      <LoginForm />
    </div>
  );
}
