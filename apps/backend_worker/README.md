# `@repo/backend_worker`

Bun runtime entry point. Imports the Elysia app from `@repo/api` and starts the HTTP server.

## Structure

```text
apps/backend_worker/
└─ src/
   └─ index.ts    # Instantiates Elysia, mounts @repo/api, calls .listen()
```

## What it does

This app is intentionally minimal — it owns no routes, no business logic, and no database access. It is only responsible for:

1. Pulling in the composed `api` from `@repo/api`
2. Starting the Bun HTTP server on the configured port
3. Logging the running address and OpenAPI URL

```ts
import { api } from "@repo/api"
const app = new Elysia().use(api).listen({ port, hostname: "0.0.0.0" })
```

All route logic lives in `packages/api`. To add routes, work there.

## OpenAPI / Scalar

When running, interactive docs are available at:

```
http://localhost:8080/api/openapi
```

The raw OpenAPI spec JSON is at `/api/openapi/json`.

## Env required

All env variables are validated by `packages/api/src/utils/envs.ts` at startup. The worker itself only reads `PORT` (defaults to `8080`).

## Commands

```sh
bun run --cwd apps/backend_worker dev
bun run --cwd apps/backend_worker start
```
