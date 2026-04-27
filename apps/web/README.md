# `@repo/web`

Next.js 15 frontend (App Router). Consumes the Elysia API via the typed Eden client and organizes UI by feature modules.

## Structure

```text
apps/web/
├─ app/
│  ├─ layout.tsx                         # Root layout — fonts, metadata, AppProviders
│  ├─ global.css                         # Tailwind entry (@import @repo/ui/global.css)
│  ├─ app-providers.tsx                  # ThemeProvider + QueryClientProvider + Toaster
│  ├─ (public)/                          # Unauthenticated routes
│  │  └─ page.tsx                        # Landing / home
│  ├─ (auth)/                            # Auth routes
│  │  └─ auth/page.tsx
│  └─ (private)/                         # Authenticated routes (middleware-guarded)
│     └─ (dashboard)/
│        └─ dashboard/
│           ├─ layout.tsx                # SidebarProvider + AppSidebar + SidebarInset
│           └─ page.tsx
├─ modules/
│  ├─ auth/                              # Auth feature module
│  │  ├─ index.ts
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ service/
│  │  └─ types/
│  └─ dashboard/                         # Dashboard shell module
│     ├─ index.ts
│     ├─ components/
│     ├─ data/
│     └─ types/
└─ utils/
   ├─ auth-connection.ts                 # Thin wrapper over auth module service
   └─ normalize-error.ts                 # Safe error message extraction
```

## Module pattern

Each feature lives under `modules/<feature>/`:

```text
modules/<feature>/
├─ index.ts           # Public barrel exports
├─ types/             # TypeScript types
├─ service/           # API calls + envelope unwrapping
├─ hooks/             # React Query (useQuery / useMutation)
├─ components/        # UI components for this feature
└─ lib/               # Optional pure helpers
```

Rules:
- Pages are thin assemblers — no API calls, no business logic
- Service layer unwraps API envelopes and normalizes errors
- Hooks orchestrate React Query; components never call `apiClient` directly
- Cross-feature utilities live in `utils/`, not inside modules

## Authentication

Auth is handled by `modules/auth/` using `authClient` from `@repo/auth/client`. Route protection is enforced by Next.js middleware. The `(private)` route group requires an active session.

## Theming

`ThemeProvider` wraps the app in `app-providers.tsx`. Theme toggle lives in `modules/dashboard/components/change-theme.tsx`. Supported themes: `light`, `dark`, `system`.

## Adding a feature

1. Create `modules/<feature>/` with types, service, hooks, and components
2. Export from `modules/<feature>/index.ts`
3. Add routes under `app/(private)/` for authenticated pages
4. Keep pages in `app/` as thin as possible

## Env required

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FRONTEND` | Public URL of this app |
| `NEXT_PUBLIC_BACKEND` | Public URL of the API (`backend_worker`) |

## Commands

```sh
bun run --cwd apps/web dev
bun run --cwd apps/web build
bun run --cwd apps/web check-types
```
