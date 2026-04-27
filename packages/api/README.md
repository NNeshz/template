# `@repo/api`

Elysia API package. Defines the HTTP surface, auth guards, response envelope, and the typed Eden contract consumed by the frontend.

## Structure

```text
packages/api/
├─ index.ts
└─ src/
   ├─ index.ts                      # Root composition — prefix, CORS, plugins, type export
   ├─ utils/
   │  ├─ envs.ts                    # TypeBox env validation (throws on bad config)
   │  ├─ better-auth-plugin.ts      # Mounts auth handler + `authenticated` macro
   │  ├─ api-envelope.ts            # apiSuccess / apiError runtime helpers
   │  ├─ api-envelope.schema.ts     # TypeBox schemas for success/error envelopes
   │  └─ openapi-meta.ts            # OpenAPI/Scalar documentation config
   └─ modules/
      └─ <feature>/
         ├─ <feature>.routes.ts     # Route barrel
         ├─ <feature>.module.ts     # Elysia module (.decorate singleton service)
         ├─ <feature>.service.ts    # Business logic + db access
         ├─ <feature>.schema.ts     # TypeBox request/response schemas
         └─ routes/
            └─ owner.routes.ts      # Protected handlers
```

## Public contract

`src/index.ts` exports `type Api = typeof api`. This is the only thing the frontend needs to type the Eden client — never import route handlers directly.

## Response envelope

Every first-party endpoint must follow this shape:

```json
// success
{ "success": true, "status": 200, "message": "...", "data": {} }

// error
{ "success": false, "status": 401, "message": "..." }
```

Use `apiSuccess` / `apiError` from `utils/api-envelope.ts` and the matching TypeBox schemas from `utils/api-envelope.schema.ts` in route `response` declarations.

## Authentication

The `betterAuthPlugin` in `utils/better-auth-plugin.ts`:
- Mounts the Better Auth handler at `/api/auth/*`
- Provides the `authenticated` macro — use it on any route that requires a session

```ts
.get("/me", ({ user }) => user, { authenticated: true })
```

Unauthenticated calls return `401` with the standard error envelope.

## Adding a feature module

1. Create `src/modules/<feature>/` with service, schema, routes, and module files
2. Register the module in `src/index.ts`
3. Keep service layer free of HTTP concerns (no `set`, no `status` calls)

## Env required

`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_FRONTEND`, `NEXT_PUBLIC_BACKEND`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

Validation runs at startup via TypeBox — the process exits if any variable is missing.

## Commands

```sh
bun run --cwd packages/api check-types
```
