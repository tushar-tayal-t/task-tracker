/**
 * Application configuration
 */

export const APP_CONFIG = {
  name: 'TaskTracker',
  tagline: 'Modern High-Velocity Task & Project Orchestration',
  description: 'Enterprise task tracking, agile sprints, and team collaboration engineered for high-performance software and product teams.',
  version: '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiPrefix: '/api',
  routes: {
    home: '/',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    workspaces: '/workspaces',
    dashboard: '/dashboard',
    tasks: '/tasks',
    projects: '/projects',
    users: '/users',
    settings: '/settings',
    health: '/api/health',
  },
  socials: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    docs: 'https://nextjs.org/docs',
  },
  links: {
    terms: '/terms',
    privacy: '/privacy',
    changelog: '/changelog',
    support: '/support',
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
