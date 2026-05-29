# Validation Baseline — Next Forge → Upcube Console

Generated: 2026-05-27
Repo: `next-forge` v6.0.2 (Vercel Turborepo template)

---

## Package Manager

- **Package manager:** `bun@1.3.14` (declared `bun@1.3.10` in `package.json`, actual `1.3.14` on PATH)
- **Lockfile:** `bun.lock`
- **Workspaces:** `apps/*`, `packages/*`

## Apps Detected (7)

| App | Port | Framework | Tests? |
|---|---|---|---|
| `app` | 3000 | Next 16 | Vitest |
| `web` | 3001 | Next 16 | No test script |
| `api` | 3002 | Next 16 | Vitest |
| `docs` | 3004 | Mintlify | No test script |
| `email` | — | React Email (stub) | No |
| `storybook` | — | Storybook | No |
| `studio` | — | Stub (empty) | No |

## Packages Detected (20)

`ai`, `analytics`, `auth`, `cms`, `collaboration`, `database`, `design-system`, `email`, `feature-flags`, `internationalization`, `next-config`, `notifications`, `observability`, `payments`, `rate-limit`, `security`, `seo`, `storage`, `typescript-config`, `webhooks`

## Install Result

| Step | Result |
|---|---|
| `bun install` | **PASS** — 3914 packages in 6.18s |

## Validation Commands

| Command | Result | Notes |
|---|---|---|
| `bun run check` (ultracite check) | **PASS** — 300 files checked, 0 issues | Lint/format OK |
| `bun run --filter='!docs' typecheck` | **FAIL** — type errors in multiple packages | See below |
| `bun run --filter=app typecheck` | **FAIL** — needs `prisma generate` | Missing `generated/client` |
| `bun run --filter=web typecheck` | **PASS** — exit 0 | |
| `bun run --filter=api typecheck` | **FAIL** — needs `prisma generate` | Missing `generated/client` |
| `bun run --filter='@repo/auth' typecheck` | **PASS** — exit 0 | |
| `bun run --filter='@repo/design-system' typecheck` | **FAIL** — resizable panel types, chart types | Upstream type issues |
| `bun run --filter='@repo/database' typecheck` | **FAIL** — needs `prisma generate` | Expected |
| `bun run --filter='@repo/next-config' typecheck` | **PASS** — exit 0 | |

### Typecheck Failures Summary

1. **Prisma generated client** — `packages/database/index.ts` requires `prisma generate` (needs schema + database)
2. **`apps/app`** — 2 implicit `any` errors on `page` params; blocked by Prisma
3. **`apps/api`** — blocked by Prisma only
4. **`@repo/design-system`** — `react-resizable-panels` types mismatch (upstream)
5. **`@repo/ai`** — `ai` SDK renamed `Message` → `UIMessage`; `OpenAIProviderSettings` missing `compatibility`
6. **`@repo/payments`** — `actions` not in `Configuration` type (upstream)
7. **`@repo/notifications`** — Knock client options type mismatch
8. **`rate-limit` → cross-package** — cascading JSX errors from `@repo/email`, `@repo/feature-flags`, `@repo/notifications`, `@repo/seo` when typechecked through `rate-limit`'s tsconfig
9. **`scripts/initialize.ts`** — validator type mismatch

No `bun run test`, `bun run build`, or `turbo test` was attempted — these require environment variables, database connections, or external services.

## Git/Repo State

| Aspect | Status |
|---|---|
| `.git` | Initialized (was missing — extracted archive) |
| Branch | `main` |
| Working tree | All files untracked (initial state) |
| `.gitignore` | Present — includes `node_modules` |

## Blockers

1. **Prisma generate required** — `packages/database` has `prisma/schema.prisma` but `generated/client/` is missing. Needs `prisma generate` (requires `DATABASE_URL` env).
2. **Typecheck failures are template-level** — upstream type mismatches in `ai`, `payments`, `design-system` (resizable/chart), `notifications` are pre-existing in next-forge v6.0.2 and not caused by our changes.
3. **Environment variables** — 30+ env vars needed for build/runtime. None set. `apps/app/.env.example` documents expected vars.

## Known Limitations

- No `.env` files present — only `.env.example` templates
- `apps/email` and `apps/studio` appear to be empty stubs (no source files)
- `docs/` is a Mintlify documentation app — not a repo-status folder
- All typecheck failures are pre-existing in the template; none were introduced by this job
- Build and test commands were skipped (require env vars, DB, external services)

## Recommended Next Job

**Job 3: Console UI — static route scaffolding.** Since `ultracite check` passes and `web` typecheck passes, the template is safe for structural edits. Start with the `apps/app` authenticated dashboard routes, keeping within existing conventions.
