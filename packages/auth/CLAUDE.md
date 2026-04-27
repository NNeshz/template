# Auth Package — Claude Context

This package owns the Better Auth configuration. It is shared between the API (server) and the web app (client).

## Key facts

- Server config: `src/utils/auth.ts` — exports `auth` and `Session` type
- React client: `src/client/index.ts` — exports `authClient` (uses `createAuthClient`)
- Vanilla client: `src/client/vanilla.ts` — exports `authClientVanilla` (no React dependency)
- Public exports from `index.ts`: `auth`, `Session`
- Sub-path exports via package `exports` map: `@repo/auth/client` → `src/client/index.ts`

## Import patterns

```ts
// Server (API, server actions)
import { auth } from "@repo/auth"
import type { Session } from "@repo/auth"

// React client (web app)
import { authClient } from "@repo/auth/client"

// Vanilla client
import { authClientVanilla } from "@repo/auth/client/vanilla"
```

## Extending auth

To add a new OAuth provider:
1. Add it under `socialProviders` in `src/utils/auth.ts`
2. Add env variables (client ID + secret)
3. Update `packages/api/src/utils/envs.ts` with the new variables
4. Update root `.env.example`

## What NOT to do

- Do not import from `@repo/api` inside this package (circular dependency)
- Do not add app-specific logic — this package is shared across all consumers
- Do not expose auth internals; keep the server `auth` object server-side only
