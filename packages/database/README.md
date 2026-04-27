# `@repo/database`

Single source of truth for the PostgreSQL schema, Drizzle client, and migration tooling.

## Structure

```text
packages/database/
├─ index.ts                        # Public re-exports (schema, client, drizzle operators)
├─ drizzle.config.ts               # Drizzle Kit config (reads root .env)
└─ src/
   ├─ client.ts                    # postgres-js + drizzle() client
   ├─ lib/
   │  └─ direct-database-url.ts    # URL helper used by drizzle.config.ts
   ├─ schema/
   │  ├─ index.ts                  # Re-exports all tables
   │  └─ auth.ts                   # Better Auth tables (user, session, account, verification)
   └─ enums/
      └─ index.ts                  # Shared PG enums (add feature enums here)
```

## Adding schema

1. Create `src/schema/<feature>.ts` with your `pgTable` definitions
2. Export from `src/schema/index.ts`
3. Run `bun run --cwd packages/database db:generate` to create the migration
4. Run `bun run --cwd packages/database db:migrate` to apply it

Adding enums: create `src/enums/<feature>.enum.ts`, export from `src/enums/index.ts`.

## Commands

```sh
# Generate migration from schema changes
bun run --cwd packages/database db:generate

# Apply pending migrations
bun run --cwd packages/database db:migrate

# Push schema directly (dev only — skips migration files)
bun run --cwd packages/database db:push

# Open Drizzle Studio
bun run --cwd packages/database db:studio
```

## Importing

```ts
// Tables + client
import { db, user, session } from "@repo/database"

// Drizzle operators (eq, and, or, etc.)
import { eq, and } from "@repo/database"
```

## Env required

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string — URL-encode special chars in password |

## Notes

- `drizzle/` (migration files) is gitignored in this template. Generate them fresh when you start a project.
- Never copy migration files from another project — always generate from the schema in this repo.
- Keep `drizzle/meta/` tracked once you start generating (Drizzle uses it for migration history).
