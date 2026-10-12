'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { loginSchema, LoginFormData } from '../schemas/auth.schema';
import { useLoginMutation } from '../api/auth.mutations';
import { normalizeApiError } from '@/lib/api/errors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APP_CONFIG } from '@/config/app.config';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Production-grade TanStack Query Mutation with Sonner Toasts
  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      toast.success(`Welcome back, ${data.user.name || 'Member'}!`);
      router.push(APP_CONFIG.routes.workspaces);
    },
    onError: (error) => {
      const msg = normalizeApiError(error);
      toast.error(msg);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleFillDemo = () => {
    setValue('email', 'alex.rivera@tasktracker.io', { shouldValidate: true });
    setValue('password', 'Password123!', { shouldValidate: true });
    setValue('rememberMe', true, { shouldValidate: true });
    toast.info('Demo credentials populated');
  };

  const errorMessage = loginMutation.error
    ? normalizeApiError(loginMutation.error)
    : null;

  return (
    <div className="w-full space-y-6">
      {/* Demo Credentials Auto-Fill Pill */}
      <div className="flex items-center justify-between rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-2.5 text-xs text-indigo-300">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
          <span>Need quick test access?</span>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="font-semibold text-white underline underline-offset-2 hover:text-indigo-200 cursor-pointer"
        >
          Auto-fill Demo
        </button>
      </div>

      {/* API Error Notification */}
      {errorMessage && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form with React Hook Form & TanStack Query Mutation */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium text-zinc-300"
          >
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            error={errors.email?.message}
            leftIcon={<Mail className="h-4 w-4" />}
            {...register('email')}
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-zinc-300"
            >
              Password
            </label>
            <Link
              href={APP_CONFIG.routes.forgotPassword}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••••••"
            error={errors.password?.message}
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-400 hover:text-zinc-200 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            {...register('password')}
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-950 cursor-pointer"
          />
          <label
            htmlFor="rememberMe"
            className="text-xs text-zinc-400 select-none cursor-pointer"
          >
            Remember me on this browser
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="glow"
          className="w-full mt-2"
          size="md"
          isLoading={loginMutation.isPending}
          rightIcon={!loginMutation.isPending ? <ArrowRight className="h-4 w-4" /> : undefined}
        >
          {loginMutation.isPending ? 'Signing In...' : 'Sign In to Workspace'}
        </Button>
      </form>

      {/* Switch to Register */}
      <div className="text-center pt-2">
        <p className="text-xs text-zinc-400">
          Don&apos;t have an account yet?{' '}
          <Link
            href={APP_CONFIG.routes.register}
            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
