# API Package — Claude Context

This is the Elysia HTTP API package. It defines all routes, auth guards, and the typed contract.

## Key facts

- Stack: Elysia + TypeBox + Better Auth plugin + OpenAPI (Scalar)
- All routes live under the `/api` prefix
- `type Api = typeof api` in `src/index.ts` is the only thing the frontend needs
- Do not add business logic to route handlers — delegate to service classes

## Response envelope (mandatory)

Every route must return one of these shapes. Use the helpers and schemas already in `src/utils/`:

```ts
// success
apiSuccess("message", data)         // runtime helper
apiSuccessEnvelopeSchema(dataSchema) // TypeBox schema for route `response`

// error
apiError(status, "message")          // runtime helper
apiErrorEnvelopeSchema(statusCode)   // TypeBox schema
```

## Authentication macro

```ts
.get("/protected", ({ user }) => user, { authenticated: true })
```

Unauthenticated → `401` with standard error envelope. No custom auth checks needed.

## Adding a feature module

```text
src/modules/<feature>/
├─ <feature>.routes.ts    # route barrel
├─ <feature>.module.ts    # .decorate({ <feature>Service: new FeatureService() })
├─ <feature>.service.ts   # db access + business logic, no HTTP
└─ <feature>.schema.ts    # TypeBox schemas
```

Register in `src/index.ts` with `.use(featureModule)`.

## What NOT to do

- Do not import `@repo/api` from within this package
- Do not call `db` directly inside route handlers — use a service
- Do not skip envelope on any first-party JSON route
- Do not add env variables without updating `src/utils/envs.ts`
