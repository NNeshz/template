# Full-Stack Template (Next.js + Elysia + Better Auth + Drizzle)

Production-oriented monorepo template with a clear architecture contract:

- `apps/web` for the frontend (Next.js App Router)
- `packages/api` for HTTP APIs (Elysia)
- `packages/database` for schema + migrations (Drizzle)
- `packages/auth` for shared Better Auth configuration

This README is the practical implementation guide for how this repository should be used, extended, and kept production-ready.

---

## 1) Core Principles

1. Keep architecture consistent across all features.
2. Build only what is explicitly in scope (avoid noisy scaffolding).
3. Preserve a single typed API client flow (Eden), not parallel wrappers.
4. Keep env contract strict and synchronized across docs, `.env.example`, and validation.
5. Prioritize maintainability and clear boundaries over short-term shortcuts.

---

## 2) Environment Variables (Contract)

Only these are required for the base template:

- `NEXT_PUBLIC_FRONTEND_URL`
- `NEXT_PUBLIC_BACKEND_URL`
- `AUTH_SECRET`
- `DATABASE_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

Optional, only if actually implemented in this repo:

- extra trusted origins (`NEXT_PUBLIC_FRONTEND_WWW`, etc.)
- cookie domain for cross-subdomain cookies (`NEXT_PUBLIC_COOKIE_DOMAIN`, etc.)

If you add new auth providers/secrets, update all of the following together:

- `.env.example`
- auth config in `packages/auth/utils/auth.ts`
- API env validation
- this README

---

## 3) What the Boilerplate Should Implement by Default

Minimal runnable scope:

1. API ping/health endpoint
2. End-to-end auth (Google OAuth + sessions)

What to avoid by default:

- unrelated feature modules
- generated “everything” scaffolds
- extra env variables not in contract

---

## 4) Repository Structure

```text
.
├─ apps/
│  ├─ web/                # Next.js app (App Router)
│  └─ backend_worker/     # Elysia runtime entry (mounts API)
├─ packages/
│  ├─ api/                # Elysia API + typed Eden client factory
│  ├─ auth/               # Better Auth server/client helpers
│  ├─ database/           # Drizzle schema, db client, migrations, enums
│  └─ ui/                 # Shared UI primitives/providers
└─ README.md
```

### Responsibilities

- **Database package** is the single source of truth for SQL schema.
- **API package** owns route composition, validation, auth guards, envelope output.
- **Web app** consumes the API using typed Eden client and composes UI by feature modules.

---

## 5) Database (`packages/database`)

Purpose: centralized Postgres schema + `db` client for server-side usage.

Suggested shape:

```text
packages/database/
├─ index.ts
├─ drizzle.config.ts
├─ drizzle/
│  ├─ *.sql
│  └─ meta/
└─ src/
   ├─ client.ts
   ├─ schema/
   │  ├─ index.ts
   │  ├─ auth.ts
   │  └─ <feature>.ts
   └─ enums/
      ├─ index.ts
      └─ <feature>.enum.ts
```

Rules:

- Keep table definitions under `src/schema/`.
- Re-export from `src/schema/index.ts`, then from package root.
- Generate migrations in this repo only.
- Never copy migration files from another repository.
- Keep `drizzle/meta` tracked (Drizzle uses it for migration history).
- Define shared database enums in `src/enums/` and re-export from `src/enums/index.ts`.
- Re-export enums from package root so API/feature code imports from one stable entrypoint.

Example enum pattern:

```text
src/enums/
├─ index.ts
├─ common.enum.ts
└─ billing.enum.ts
```

---

## 6) API (`packages/api`)

Stack: Elysia + Better Auth plugin + OpenAPI (`@elysiajs/openapi`) + Eden typing.

### Root composition (`src/index.ts`)

- Global prefix (`/api`)
- CORS with frontend origin + `credentials: true`
- Better Auth plugin
- ping routes
- OpenAPI registration
- `export type Api = typeof api` as the public typed contract

### Feature module pattern

Use `<feature>` as a concrete name like `notes`, `users`, or `billing`.

```text
src/
└─ modules/
   ├─ <feature>/
   │  ├─ <feature>.routes.ts         # Barrel for route groups
   │  ├─ <feature>.module.ts         # Elysia module (.decorate)
   │  ├─ <feature>.service.ts        # Business logic + db access
   │  ├─ <feature>.schema.ts         # TypeBox request/response schema
   │  ├─ routes/
   │  │  └─ owner.routes.ts          # Protected handlers (owner scope)
   │  ├─ model/                      # Optional domain models/mappers
   │  │  └─ index.ts
   │  ├─ utils/                      # Optional domain helpers
   │  │  └─ index.ts
   │  └─ types/                      # Optional extra TS types
   │     └─ index.ts
   └─ ping/
      └─ ping.routes.ts
```

Guidelines:

- Service layer: domain logic + db access (no HTTP concerns)
- Schema layer: request/response validation (TypeBox)
- Routes: auth + handlers + envelope responses
- Module: decorates singleton service instance
- Register only requested features in `src/index.ts`

---

## 7) API Response Envelope (Standard)

All first-party JSON endpoints should follow one shape.

### Success

```json
{
  "success": true,
  "status": 200,
  "message": "Human-readable summary",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "status": 401,
  "message": "Human-readable error"
}
```

Rules:

- `data` exists only on success
- `status` in JSON matches HTTP status on error
- route `response` schemas must match runtime envelope
- use shared helpers (`apiSuccess`, `apiError`) and schema builders

---

## 8) Better Auth Integration

### `packages/auth`

- `utils/auth.ts` exports `auth` from `betterAuth({ ... })`
- Drizzle adapter uses auth tables from `@template/database`
- Uses `AUTH_SECRET`, backend base URL, trusted origins
- Google OAuth uses `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- Optional cross-subdomain cookie config only if env contract includes it

### `packages/api`

- `better-auth-plugin.ts` mounts auth handler routes
- exposes authenticated macro (session required => 401 envelope)
- protected routes use plugin + `authenticated: true`

### `apps/web`

- use shared auth client helpers
- do not bypass with ad hoc auth fetches unless intentionally designed

---

## 9) Eden Typed Client Flow

The API package exports a single typed client factory:

- `packages/api/src/eden/index.ts`
- `createApiClient(baseUrl)` via `treaty<Api>(...)`
- browser fetch uses `credentials: "include"`

Frontend rule:

- create one `apiClient` in a shared utility (e.g. `apps/web/utils/api-connection.ts`)
- feature services use that singleton
- do not create parallel API clients with different behavior

---

## 10) Frontend (`apps/web`) Module Architecture

Keep pages thin and feature modules structured.

```text
apps/web/modules/<feature>/
├─ types/
│  └─ <feature>.types.ts
├─ service/
│  └─ <feature>-service.ts
├─ hooks/
│  └─ use-<feature>.ts
├─ store/
│  └─ use-<feature>-filters.ts      # optional
├─ components/
└─ lib/
```

### Layer responsibilities

- **service/**: API calls, envelope unwrapping, error normalization
- **hooks/**: React Query orchestration and cache invalidation
- **components/**: atomic/presentational composition
- **app/** pages/layouts: assembly only

### Atomic component guidance

Do:

- split UI into focused components
- compose upward (small piece -> row/card -> section/page)
- colocate feature-specific components under that module

Don’t:

- call `apiClient` directly inside arbitrary leaf components
- duplicate envelope-unwrapping logic across components
- mix unrelated features in one module tree

---

## 11) Shared Web Utilities

Common expected files:

- `apps/web/utils/api-connection.ts` — singleton typed API client
- `apps/web/utils/normalize-error.ts` — user-safe error extraction
- `apps/web/utils/auth-connection.ts` — auth wrappers (if used)
- `apps/web/utils/use-active-route.ts` — nav helper (optional)
- `apps/web/utils/use-debounce.ts` — generic debounce (optional)

Add new `utils` only when they are cross-feature reusable.

---

## 12) Dependency Upgrade Policy

When refreshing the template:

1. Update dependencies per workspace package (`apps/*`, `packages/*`, and root if needed).
2. Keep compatibility groups aligned:
   - Elysia stack (`elysia`, `@elysiajs/*`)
   - Next.js + React + React types
   - Better Auth + adapters
   - Drizzle ORM + Drizzle Kit + driver
3. Reinstall and refresh lockfile.
4. Validate runtime and type safety before finalizing.

Verification checklist after upgrades:

- install/reinstall
- typecheck (`check-types` / `tsc`)
- lint
- build apps
- smoke test ping + auth + session cookies

---

## 13) Production Readiness Checklist

Before deploy:

- [ ] env vars configured in each environment
- [ ] database migrations generated/applied from this repo
- [ ] CORS origin + `credentials: true` validated
- [ ] auth redirect URLs and trusted origins correct
- [ ] OpenAPI docs available and route schemas accurate
- [ ] `check-types`, `lint`, and build all pass
- [ ] ping route healthy in deployed API

---

## 14) Feature Implementation Workflow (When Explicitly Requested)

For a new feature:

1. **Database**: create schema (`src/schema/<feature>.ts`) + migration
2. **API**: service, module, schema, owner routes, route barrel, root registration
3. **Web**: feature types, service (typed client), hooks, atomic components, thin page
4. **Verification**: typecheck + smoke flow end-to-end

Do not implement unrelated features in the same task.

---

## 15) Local Development

```sh
# Install deps
bun install

# Run all workspace dev processes
bun dev
```

Common package-level commands (example):

```sh
# Generate database migration
bun run --cwd packages/database db:generate

# Apply migrations
bun run --cwd packages/database db:migrate

# Typecheck web
bun run --cwd apps/web check-types

# Typecheck API
bun run --cwd packages/api check-types
```

---

## 16) Notes for Contributors

- Keep changes scoped to the requested feature.
- Respect architecture boundaries (database -> api -> web).
- Preserve envelope and typing consistency.
- Prefer maintainability over large one-off scaffolds.

If architecture changes are needed, update docs and code together.