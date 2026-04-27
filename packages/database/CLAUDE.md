# Database Package — Claude Context

Single source of truth for the PostgreSQL schema and Drizzle client. All other packages import from here — never define tables anywhere else.

## Key facts

- ORM: Drizzle ORM with `postgres-js` driver
- Schema tables: `src/schema/` — currently only Better Auth tables (`auth.ts`)
- Shared enums: `src/enums/` — re-export from `src/enums/index.ts`
- Public surface: `index.ts` re-exports tables, `db` client, and all Drizzle operators

## Import patterns

```ts
import { db, user, session } from "@repo/database"
import { eq, and, desc } from "@repo/database"
```

## Adding a table

1. Create `src/schema/<feature>.ts` with `pgTable` definition
2. Export from `src/schema/index.ts`
3. Generate migration: `bun run --cwd packages/database db:generate`
4. Apply: `bun run --cwd packages/database db:migrate`

## Adding an enum

1. Create `src/enums/<feature>.enum.ts`
2. Export from `src/enums/index.ts`
3. Import in schema files as needed

## Migration rules

- Always generate migrations from this repo — never copy from another project
- `drizzle/` is gitignored in the template; generate fresh when starting a project
- Once you start tracking migrations, keep `drizzle/meta/` committed

## What NOT to do

- Do not define tables inside feature modules in `packages/api` or `apps/web`
- Do not call `db` from inside `apps/web` — all DB access goes through the API
- Do not import `@repo/api` or `@repo/auth` from here (database has no upward deps)
