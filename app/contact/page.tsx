'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APP_CONFIG } from '@/config/app.config';
import { toast } from 'sonner';
import {
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Building,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Product Support');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Your message has been sent to our team!');
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 text-center border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Mail className="h-3.5 w-3.5 text-indigo-500" />
              <span>We&apos;re Here to Help</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Get in touch with the TaskTracker team
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
              Have questions about workspace setup, feature requests, or enterprise subscriptions? We typically respond in under 20 minutes.
            </p>
          </div>
        </section>

        {/* Form and Contact Cards */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Direct Support Channels
                </h2>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Reach out directly through any of our channels or submit the form for guaranteed response times.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-white">Support & Inquiries</div>
                      <a href="mailto:support@tasktracker.internal" className="text-xs text-indigo-600 hover:underline dark:text-indigo-400">
                        support@tasktracker.internal
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-white">Support Response SLA</div>
                      <div className="text-xs text-zinc-500">Average reply: &lt; 20 minutes (24/7 on-call)</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      <Building className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-white">Engineering HQ</div>
                      <div className="text-xs text-zinc-500">Remote First · Global Product Team</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">All Systems Operational</span>
                </div>
                <p className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-400">
                  Sprint tracker APIs, chat WebSocket servers, and media delivery running at 100% capacity.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Message Received!
                    </h3>
                    <p className="mx-auto max-w-sm text-xs text-zinc-600 dark:text-zinc-400">
                      Thanks for reaching out, <strong>{name}</strong>. An engineer will follow up at <strong>{email}</strong> shortly.
                    </p>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSubmitted(false);
                          setMessage('');
                        }}
                      >
                        Send another message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Send a Message
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Fill out the form below and we will get back to you promptly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <Input
                          placeholder="Alex Chen"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          Work Email <span className="text-rose-500">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="alex@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Topic Category
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                      >
                        <option value="Product Support">Product Support & Troubleshooting</option>
                        <option value="Workspace Setup">Workspace Setup & Onboarding</option>
                        <option value="Feature Request">Feature Request / Feedback</option>
                        <option value="Enterprise Sales">Enterprise Inquiries & Pricing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Describe your question, issue, or feature idea..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        rightIcon={<Send className="h-3.5 w-3.5" />}
                        className="w-full sm:w-auto px-6 text-xs"
                      >
                        Send Inquiry
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
