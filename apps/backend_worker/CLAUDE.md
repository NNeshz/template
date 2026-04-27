# Backend Worker — Claude Context

Bun runtime entry point for the HTTP server. This app is intentionally minimal — it owns nothing except server startup.

## Key facts

- Runtime: Bun
- HTTP framework: Elysia (imported from `@repo/api`)
- Entry: `src/index.ts` — mounts `api` from `@repo/api`, calls `.listen()`
- Default port: `8080` (override with `PORT` env variable)
- OpenAPI docs: `http://localhost:8080/api/openapi` (Scalar UI)

## Responsibility

This app does **one thing**: start the server. All routes, middleware, auth, and business logic live in `packages/api`.

```ts
// This is the entire app logic
const app = new Elysia().use(api).listen({ port, hostname: "0.0.0.0" })
```

## What NOT to do

- Do not add routes here — add them to `packages/api/src/modules/`
- Do not add business logic or db access here
- Do not import `@repo/database` or `@repo/auth` directly — `@repo/api` handles those
- Do not add middleware here — configure it in `packages/api/src/index.ts`

## Env

All env validation happens in `packages/api/src/utils/envs.ts` at startup. If any required variable is missing, the process will exit with a descriptive error before the server starts.
