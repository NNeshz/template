# `@repo/auth`

Shared Better Auth configuration. Exports the server-side `auth` instance and both React and vanilla client helpers.

## Structure

```text
packages/auth/
├─ index.ts                  # Re-exports auth + Session type
└─ src/
   ├─ utils/
   │  └─ auth.ts             # betterAuth() config — Drizzle adapter, Google OAuth
   └─ client/
      ├─ index.ts            # React client (createAuthClient)
      └─ vanilla.ts          # Framework-agnostic client (createAuthClientVanilla)
```

## Server usage

```ts
import { auth } from "@repo/auth"

// In API handler (Elysia)
const session = await auth.api.getSession({ headers })
```

The `auth` instance uses the Drizzle adapter with `@repo/database`'s `db` client and the standard PostgreSQL auth tables.

## Client usage (React / Next.js)

```ts
import { authClient } from "@repo/auth/client"

const { data: session } = authClient.useSession()
await authClient.signIn.social({ provider: "google", callbackURL: "/" })
await authClient.signOut()
```

## Client usage (vanilla / server actions)

```ts
import { authClientVanilla } from "@repo/auth/client/vanilla"
```

## Env required

| Variable | Description |
|---|---|
| `BETTER_AUTH_SECRET` | Random secret — generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Base URL the auth server runs on |
| `GOOGLE_CLIENT_ID` | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth app client secret |

To add a new OAuth provider:
1. Add it under `socialProviders` in `src/utils/auth.ts`
2. Add the required env variables
3. Update `packages/api/src/utils/envs.ts` and the root `.env.example`

## Session type

```ts
import type { Session } from "@repo/auth"
```
