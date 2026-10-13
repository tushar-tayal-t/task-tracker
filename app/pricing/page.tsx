'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/config/app.config';
import {
  Check,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Building,
  Users,
} from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Free Starter',
      description: 'Ideal for solo indie hackers and early proof-of-concept projects.',
      price: '$0',
      period: 'forever free',
      highlight: false,
      cta: 'Get Started Free',
      href: APP_CONFIG.routes.register,
      features: [
        '1 Workspace',
        'Up to 5 team members',
        'Up to 100 active tasks',
        'Priority tagging (Urgent, High, Low)',
        'General team chat channel',
        '500MB media file attachments',
        'Community support',
      ],
    },
    {
      name: 'Team Sprint',
      description: 'Engineered for high-velocity software engineering and product teams.',
      price: annual ? '$12' : '$15',
      period: 'per member / month',
      badge: 'Most Popular',
      highlight: true,
      cta: 'Start 14-Day Free Trial',
      href: APP_CONFIG.routes.register,
      features: [
        'Unlimited Workspaces',
        'Unlimited team members',
        'Unlimited tasks & sprints',
        'Priority URL query routing & filters',
        'Group channels + 1-on-1 private DMs',
        '25GB media & attachment storage',
        'Task assignment load distribution',
        'Dark & light mode system sync',
        'Priority email & Slack support',
      ],
    },
    {
      name: 'Enterprise',
      description: 'For growing organizations needing security, SLAs, and governance.',
      price: annual ? '$39' : '$49',
      period: 'per member / month',
      highlight: false,
      cta: 'Contact Sales',
      href: APP_CONFIG.routes.contact,
      features: [
        'Everything in Team Sprint',
        'Dedicated single-tenant infrastructure',
        'SAML 2.0 & Okta SSO integration',
        'Granular audit logging & exports',
        'Unlimited attachment storage',
        '99.99% uptime SLA guarantee',
        'Dedicated customer success engineer',
        'Custom invoicing & legal agreements',
      ],
    },
  ];

  const faqs = [
    {
      q: 'Can I change or cancel my plan at any time?',
      a: 'Yes, you can upgrade, downgrade, or cancel your subscription at any time directly in Workspace Settings. Changes take effect on your next billing cycle.',
    },
    {
      q: 'How does member billing work in a workspace?',
      a: 'You only pay for active workspace members who have access to create and collaborate on tasks. Viewers and external reviewers are free.',
    },
    {
      q: 'Are file attachments stored securely?',
      a: 'Yes. All uploaded images, documents, and technical specs are encrypted at rest and transmitted securely over TLS.',
    },
    {
      q: 'Can members be in multiple workspaces under one account?',
      a: 'Absolutely. A single user login can be invited to and switch between multiple independent workspaces seamlessly from the left sidebar.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 text-center border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Zap className="h-3.5 w-3.5 text-indigo-500" />
              <span>Simple, Transparent Pricing</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Invest in your team&apos;s shipping speed
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
              Pick the plan that fits your current sprint cadence. Start free, upgrade when your team scales.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  !annual
                    ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  annual
                    ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                <span>Annual billing</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl border p-7 transition ${
                  plan.highlight
                    ? 'border-zinc-900 bg-white shadow-xl shadow-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-none'
                    : 'border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900/30'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-zinc-900 bg-zinc-900 px-3 py-0.5 text-[11px] font-semibold text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 shadow-xs">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {plan.period}
                    </span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Included features
                    </h4>
                    <ul className="mt-4 space-y-2.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link href={plan.href} className="w-full">
                    <Button
                      variant={plan.highlight ? 'primary' : 'outline'}
                      className="w-full text-xs font-semibold"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold tracking-tight text-center text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
