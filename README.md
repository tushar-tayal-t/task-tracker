task-tracker/
│
├── app/                                # Next.js App Router
│   │
│   ├── (auth)/                         # Public authentication pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/                    # Authenticated application
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── tasks/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── users/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   │
│   ├── api/                            # Optional Next.js API routes
│   │   └── health/
│   │       └── route.ts
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   └── not-found.tsx
│
├── modules/                            # Feature-based business modules
│   │
│   ├── auth/
│   │   ├── api/
│   │   │   ├── auth.api.ts
│   │   │   ├── auth.keys.ts
│   │   │   └── auth.mutations.ts
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── hooks/
│   │   ├── schemas/
│   │   │   └── auth.schema.ts
│   │   ├── stores/
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   │
│   ├── users/
│   │   ├── api/
│   │   │   ├── user.api.ts
│   │   │   ├── user.keys.ts
│   │   │   ├── user.queries.ts
│   │   │   └── user.mutations.ts
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   ├── tasks/
│   │   ├── api/
│   │   │   ├── task.api.ts
│   │   │   ├── task.keys.ts
│   │   │   ├── task.queries.ts
│   │   │   └── task.mutations.ts
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   ├── projects/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── stores/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── employees/
│   ├── roles/
│   ├── permissions/
│   ├── notifications/
│   └── reports/
│
├── components/                         # Shared reusable UI
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── modal.tsx
│   │   └── dropdown.tsx
│   ├── forms/
│   ├── tables/
│   ├── dialogs/
│   ├── layouts/
│   └── feedback/
│
├── lib/                                # Shared technical infrastructure
│   │
│   ├── api/
│   │   ├── client.ts                  # Browser HTTP client
│   │   ├── server-client.ts           # Server-side HTTP client
│   │   ├── errors.ts                  # API error normalization
│   │   └── types.ts                   # Shared API types
│   │
│   ├── query/
│   │   ├── query-client.ts
│   │   └── query-provider.tsx
│   │
│   ├── validation/
│   ├── auth/
│   ├── logger/
│   └── utils/
│
├── stores/                             # Global Zustand stores
│   ├── ui.store.ts
│   └── preferences.store.ts
│
├── hooks/                              # Shared React hooks
│
├── providers/
│   └── app-providers.tsx
│
├── config/
│   └── app.config.ts
│
├── constants/
│   └── app.constants.ts
│
├── types/                              # Cross-module types only
│   └── common.types.ts
│
├── public/
│   ├── images/
│   └── icons/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
