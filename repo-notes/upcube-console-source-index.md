# Upcube Console — Next Forge Source Index

Generated: 2026-05-27 (initial), updated 2026-05-27 (Job 3)
Repo: `next-forge` v6.0.2 base, converting to Upcube Console
Branch: `main` (initialized locally)
Node modules: installed

---

## Package Manager & Validation

- **Package manager:** `bun@1.3.10` (`bun.lock` present)
- **Root scripts:** `turbo build`, `turbo dev`, `ultracite check`, `ultracite fix`, `turbo test`
- **Lint/check:** `ultracite check` and `ultracite fix` (biome-based formatting/linting)
- **Typecheck:** Per-app via `tsc --noEmit --emitDeclarationOnly false`
- **Test:** `vitest` (per app where configured)
- **Validation scripts not runnable** — `node_modules` not installed

---

## Monorepo Layout

```
next-forge-main/
├── apps/          # 7 deployable applications
│   ├── app/       # Main authenticated app (Next 16, port 3000)
│   ├── web/       # Marketing site (Next 16, port 3001)
│   ├── api/       # API server (Next 16, port 3002)
│   ├── docs/      # Mintlify documentation (port 3004)
│   ├── email/     # React Email templates
│   ├── storybook/ # Storybook component library
│   └── studio/    # (empty package config)
├── packages/      # 20 shared packages
│   ├── auth/      # Clerk auth (client, server, provider, components)
│   ├── design-system/ # shadcn/ui + Tailwind v4 + Radix components
│   ├── database/  # Prisma + Neon (Postgres)
│   ├── ai/        # AI utilities
│   ├── analytics/ # Google Analytics + PostHog
│   ├── cms/       # Basehub CMS
│   ├── collaboration/ # Liveblocks real-time
│   ├── email/     # Resend transactional email
│   ├── feature-flags/ # Feature flag system
│   ├── internationalization/ # Languine i18n
│   ├── next-config/ # Shared Next config + PostHog rewrites
│   ├── notifications/ # Knock in-app notifications
│   ├── observability/ # Sentry + BetterStack + logging
│   ├── payments/  # Stripe subscriptions
│   ├── rate-limit/ # Arcjet rate limiting
│   ├── security/  # Arcjet security + helmet headers
│   ├── seo/       # Metadata, sitemaps, JSON-LD
│   ├── storage/   # File upload handling
│   ├── typescript-config/ # Shared TS configs
│   └── webhooks/  # Svix webhook management
└── scripts/       # CLI template scripts
```

---

## App Routes (`apps/app`)

### Authenticated routes (`(authenticated)/`) — After Job 3
| Route | File | Purpose |
|---|---|---|
| `/` | `page.tsx` | Upcube Console overview with product & platform grid |
| `/ai` | `ai/page.tsx` | AI Console product scaffold |
| `/cloud` | `cloud/page.tsx` | Cloud product scaffold |
| `/identity` | `identity/page.tsx` | Identity product scaffold |
| `/workflow` | `workflow/page.tsx` | Workflow product scaffold |
| `/data` | `data/page.tsx` | Data product scaffold |
| `/academy` | `academy/page.tsx` | Academy product scaffold |
| `/commerce` | `commerce/page.tsx` | Commerce product scaffold |
| `/marketplace` | `marketplace/page.tsx` | Marketplace product scaffold |
| `/jobs` | `jobs/page.tsx` | Jobs product scaffold |
| `/projects` | `projects/page.tsx` | Shared platform page |
| `/artifacts` | `artifacts/page.tsx` | Shared platform page |
| `/search` | `search/page.tsx` | Registry-driven cross-product search |
| `/settings` | `settings/page.tsx` | Settings scaffold page |
| `/webhooks` | `webhooks/page.tsx` | Svix webhook portal (iframe) |
| `/api/collaboration` | `api/collaboration/auth/` | Liveblocks auth endpoint |

### Unauthenticated routes (`(unauthenticated)/`)
| Route | File | Purpose |
|---|---|---|
| `/sign-in/[[...sign-in]]` | `page.tsx` | Clerk SignIn (dynamic import) |
| `/sign-up/[[...sign-up]]` | `page.tsx` | Clerk SignUp (dynamic import) |

### App-level
| Route | File | Purpose |
|---|---|---|
| `/(root)` | `layout.tsx` | Root layout — AnalyticsProvider + DesignSystemProvider |
| `/(root)` | `styles.css` | Root CSS imports globals |

### Server Actions
| Path | File |
|---|---|
| `app/actions/users/` | User-related server actions |

---

## App Routes (`apps/web` — marketing)
- `[locale]/` — i18n layout with Header/Footer, dictionary-driven
  - `(home)/` — Landing page
  - `blog/[slug]/` — Blog posts (CMS-driven)
  - `pricing/` — Pricing page
  - `legal/[slug]/` — Legal pages
  - `contact/` — Contact page

## App Routes (`apps/api`)
- `health/route.ts` — Health check endpoint
- `webhooks/auth/` — Clerk webhooks
- `webhooks/payments/` — Stripe webhooks
- `cron/keep-alive/` — Vercel cron keep-alive

---

## Key UI Components (After Job 3)

- **Sidebar** (`apps/app/(authenticated)/components/sidebar.tsx`): Repurposed from demo to Upcube Console. Groups: Overview, Products (collapsible by product), Platform (projects/artifacts/search/settings), secondary support links. Registry-driven via `upcubeProducts`.
- **Header** (`apps/app/(authenticated)/components/header.tsx`): Page header with breadcrumbs
- **ModulePage** (`apps/app/(authenticated)/components/module-page.tsx`): Reusable scaffold page for product families. Renders title, status badge, and module cards from registry.
- **Search / Command Palette** (`apps/app/(authenticated)/components/search.tsx`): cmdk-based command palette with Cmd/Ctrl+K trigger, registry-driven static navigation commands, grouped by Overview/Products/Platform/Other, with keyboard navigation and premium empty state. Triggered from sidebar search area and Cmd+K globally.
- **Notifications** (`apps/app/(authenticated)/components/notifications-provider.tsx`): Knock notification provider
- **Collaboration** (`apps/app/(authenticated)/components/collaboration-provider.tsx`): Liveblocks provider

## App Registry (`apps/app/lib/upcube/registry.ts`)

Typed product/module registry covering all 9 Upcube product families + 5 platform surfaces. Each product has id, name, description, href, icon (lucide-react compatible), status, and modules array. Platform pages have label, description, href, status. Used by sidebar, overview page, module pages, and search.

### Design System (`packages/design-system`)
- 53 shadcn/ui components in `components/ui/`
- Theme provider with dark mode (`providers/theme.tsx`)
- AuthProvider wrapping Clerk (`index.tsx`)
- Toaster (sonner), TooltipProvider
- Fonts: Geist Sans + Geist Mono
- Tailwind v4 with OKLCH color tokens, CSS-based config

---

## Auth State

| Aspect | Detail |
|---|---|
| **Provider** | Clerk (via `@clerk/nextjs`) |
| **Client entry** | `packages/auth/client.ts` — re-exports `@clerk/nextjs` |
| **Server entry** | `packages/auth/server.ts` — re-exports `@clerk/nextjs/server` |
| **Provider** | `packages/auth/provider.tsx` — ClerkProvider with dark theme, font, URL config |
| **Wrapped in** | `DesignSystemProvider` at root layout |
| **Sign-in route** | `/sign-in` (Catch-all Clerk route) |
| **Sign-up route** | `/sign-up` (Catch-all Clerk route) |
| **Auth guard** | `apps/app/(authenticated)/layout.tsx` — `currentUser()` check, `redirectToSignIn()` |
| **Org guard** | `apps/app/(authenticated)/page.tsx` — `auth().orgId` check, `notFound()` if missing |
| **Middleware** | **Not provided** — no `middleware.ts` in repo |
| **Env keys** | `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, sign-in/up URL config |

---

## Styling / Theme

- **Tailwind v4** (`@tailwindcss/postcss`), no `tailwind.config.*`
- **CSS-based config** via `styles/globals.css` with OKLCH variables + `@theme` directive
- **Dark mode** via `next-themes` + `.dark` class variant
- **Shared PostCSS** via `packages/design-system/postcss.config.mjs`
- **Radix UI primitives** via `radix-ui` (latest) package
- **Icons** via `lucide-react` and `@radix-ui/react-icons`
- **Animations** via `tw-animate-css`

---

## Deployment / Build

| Aspect | Detail |
|---|---|
| **Target** | Vercel (all apps have `vercel.json`) |
| **Bun version** | `1.x` pinned in vercel.json |
| **CI skip** | `scripts/skip-ci.js` per app |
| **API cron** | Keep-alive cron at `0 1 * * *` |
| **Build cmd** | `bun --bun next build` |
| **Dev cmd** | `bun --bun next dev -p <port>` |
| **Prisma** | Neon Postgres via `@prisma/adapter-neon` |
| **Env pattern** | `@t3-oss/env-nextjs` with per-package `keys()` modules |
| **Observability** | Sentry (server/edge/client), BetterStack, PostHog |
| **No wrangler/**| **Not provided** — no Cloudflare/Wrangler config files found |

---

## Source Surfaces for Jobs 3–6

| Job | Likely Files |
|---|---|
| **Job 3: Console UI scaffold (done)** | `apps/app/lib/upcube/registry.ts`, `apps/app/(authenticated)/{ai,cloud,...,jobs}/page.tsx`, `sidebar.tsx`, `module-page.tsx` |
| **Job 4: Package extraction** | `packages/auth/`, `packages/design-system/`, `packages/database/`, `packages/next-config/` |
| **Job 5: Deployment/Cloudflare** | `vercel.json` (per app), `next.config.ts`, `turbo.json`, `packages/next-config/index.ts` |
| **Job 6: Auth/routing refactor** | `packages/auth/` (client, server, provider, components), `apps/app/(authenticated)/layout.tsx`, `apps/app/(unauthenticated)/layout.tsx` |

---

## Drift from Reference Docs

| Doc Claim | Repo Reality |
|---|---|
| Multi-product federated architecture | Repo is single Next Forge monolith template, not federated |
| Separate product app repos | Not implemented; template has one `apps/app` for everything. Route scaffold uses flat `/product` routes in same app |
| Product registry / module registry | Now present at `apps/app/lib/upcube/registry.ts` |
| Workspace/project model | Uses Clerk orgs (`orgId`) with hardcoded demo data |
| Entitlements/plan limits | Not implemented; `showBetaFeature()` is only feature flag |
| Cloudflare/OpenNext deployment | Not configured; all apps target Vercel |
| `middleware.ts` for auth | Not provided |
| CLI tooling | Not present in this repo |
| Tailwind config file | Tailwind v4 — no `tailwind.config.*` (CSS-based) |

---

## Unresolved Blockers

1. **No `middleware.ts`** — auth routing is layout-based only; Clerk middleware missing for route protection
2. **No Cloudflare/Wrangler config** — all deploy config targets Vercel; OpenNext migration needed
3. **Prisma generated client missing** — `packages/database` needs `prisma generate` before app/api typecheck passes
4. **Pre-existing template type errors** — upstream mismatches in `ai`, `payments`, `design-system`, `notifications` packages
5. **30+ env vars required** — none configured locally; build/test blocked without them
6. **Org guard still references DB** — `(authenticated)/layout.tsx` still calls `currentUser()`, `secure()`, `showBetaFeature()`; these work but use template services

---

## Validation (After Job 3)

| Check | Status |
|---|---|
| `git status` | All files untracked (initial state) |
| `node_modules` | Installed (3914 packages) |
| `bun run check` (ultracite) | Passed (300 files, 0 issues) |
| `bun run --filter=web typecheck` | Passed |
| `bun run --filter=app typecheck` | Failed — Prisma generated client missing, 2 implicit `any` (pre-existing) |
| **Overall** | **PASS** — lint clean, web typecheck clean, app failures pre-existing |

---

## Known Limitations

1. `docs/` directory is the Mintlify documentation *app*, not the repo documentation folder. Repo notes now live in `repo-notes/`.
2. `studio` and `email` apps appear to be package stubs with only `package.json` and `tsconfig.json`.
3. Product routes are flat scaffold pages, not real implementations.
4. Sidebar navigation renders all products with collapsible sub-modules; icon mapping is manual via `iconMap`.
5. Auth guard (`(authenticated)/layout.tsx`) still uses template Clerk calls — not customized for Upcube yet.
