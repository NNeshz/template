# Web App — Claude Context

Next.js 15 App Router frontend. Organized by feature modules; pages are thin assemblers.

## Key facts

- Framework: Next.js 15, App Router, React 19, TypeScript
- Styling: Tailwind CSS v4 (via `@repo/ui/global.css`), `tw-animate-css`
- UI components: `@repo/ui/components/*`
- Icons: `@tabler/icons-react` only
- Server state: `@tanstack/react-query` (QueryClient in `app-providers.tsx`)
- Auth: `authClient` from `@repo/auth/client`
- Route groups: `(public)` → no auth, `(auth)` → auth pages, `(private)` → requires session

## Module structure (feature pattern)

```text
modules/<feature>/
├─ index.ts        # Barrel — export only what consumers need
├─ types/          # TypeScript types for this feature
├─ service/        # API calls, envelope unwrapping, error normalization
├─ hooks/          # React Query (useQuery / useMutation)
└─ components/     # UI components scoped to this feature
```

## Layer rules

- **Service**: calls API, unwraps `{ success, data }` envelope, throws on error
- **Hook**: wraps service in React Query, owns cache keys and invalidation
- **Component**: calls hooks, never calls service or apiClient directly
- **Page** (`app/`): assembles components from one or more modules, no logic

## Path aliases

```ts
@/*   → apps/web/*               (local)
@repo/ui/*     → packages/ui/src/*
@repo/auth/*   → packages/auth/src/*
@repo/database → packages/database/index.ts  (not used from web — all via API)
```

## Auth flow

1. User visits `/auth` → `modules/auth/components/auth-section.tsx`
2. Clicks Google → `useGoogleSignIn` mutation → `authService.signInWithGoogle()`
3. Better Auth handles OAuth redirect and sets session cookie
4. Middleware redirects authenticated users away from `(auth)` routes

## What NOT to do

- Do not call `db` or import `@repo/database` directly — all data goes through the API
- Do not duplicate envelope-unwrapping logic across components
- Do not put business logic in page files
- Do not create multiple `authClient` instances — use the one from `@repo/auth/client`
- Do not use Lucide icons — use Tabler (`Icon*` prefix)
