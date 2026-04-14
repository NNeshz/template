# Boilerplate AI instructions

Use this file as the **single** source of truth for how an AI assistant should shape and maintain **the repository where this file lives**. Do not split this content across multiple READMEs or numbered fragments.

---

## Repository independence (read first)

**This document is not tied to any product name or external codebase.** It may be copied into a new git repository (for example a generic app template). The AI must:

1. **Work only in the current workspace** — the open project / clone where the human placed this file. Apply all changes **there**. Do not assume the workspace is “rentwise,” “reentwise,” or any other named product.
2. **Do not use another repository as a reference** — do not read sibling folders, other clones, or URLs to “match” file contents. Do not copy migration numbers, lockfiles, or paths from elsewhere. The **only** live sources are: this markdown file, plus the **files already in the current repository**.
3. **Discover names from the target repo** — internal package imports (e.g. `@acme/database`, `@workspace/api`) must come from **that** repo’s `package.json` / workspace config, not from examples in this document. Placeholders below use `@<scope>/…`; replace `<scope>` with the actual workspace scope.
4. **Treat layouts below as the contract** — folder trees, module shapes, envelope JSON, and Drizzle layout are **specifications**. Implement or align **the current repo** to them. If the repo is empty or divergent, create or adjust structure **in place** per this spec—do not “sync” from a different project.

If instructions here conflict with something already in **the current repository**, follow the human’s explicit direction; otherwise prefer bringing the repo **toward** this document’s conventions.

---

## Early rules (non-negotiable)

### Environment variables — complete list

The minimal boilerplate **only** uses these variables. Do not add, document, or require others (no email APIs, payment keys, extra OAuth providers, analytics, etc.) unless a human **explicitly** updates this list **in this file** and in the target repo’s env examples / validation.

| Variable | Role |
|----------|------|
| `NEXT_PUBLIC_FRONTEND_URL` | Public URL of the Next.js app (e.g. `http://localhost:3000`). |
| `NEXT_PUBLIC_BACKEND_URL` | Public URL of the API (e.g. `http://localhost:8080`). |
| `AUTH_SECRET` | Secret for sessions/auth (per the auth library). |
| `DATABASE_URL` | Postgres URL for the application. |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret. |

**Optional production / multi-origin (document only if the target repo actually uses them):** Better Auth may need extra trusted origins (e.g. `NEXT_PUBLIC_FRONTEND_WWW`) or a cookie **`domain`** for `crossSubDomainCookies` (e.g. `NEXT_PUBLIC_COOKIE_DOMAIN` or a product-specific name). **Add such variables only to the table above when they exist in the target repo**, and keep `.env.example`, validation in **`packages/auth/utils/auth.ts`**, and API env parsing in sync. A strict minimal template may omit them entirely.

**For the AI:** Do not introduce new env keys in `.env.example`, validation, or docs “for later.” If a change would need another secret (email, webhooks, etc.), stop: keep work inside **ping + auth** only, or tell the human to extend the env contract first. When configuring or debugging, use the table in **this document** plus whatever the **current repository** already references in **`packages/auth/utils/auth.ts`** and API env validation.

### What is actually implemented (working code)

Only these must exist as **real, runnable** behavior:

1. **API ping / health** — One route that proves the API is up (e.g. returns `{ ok: true }` or similar). No business domains.
2. **Authentication** — Google OAuth and session handling **end-to-end** (API + frontend), using only the env vars above and the DB tables the auth stack requires.

### What you must not build in the template

- No extra **domain modules** (audits, billing, CRM, etc.) as full implementations unless a human **names that feature** in the current task.
- No **scaffold-everything** passes: do not generate full `modules/<domain>/` trees, new tables, or new pages without an explicit request.
- If someone asks *how* something would work later, explain **patterns and folders** only, or add a short placeholder note — do not add production routes, schemas, services, or UI unless they ask to implement it.

### When asked for more than ping + auth

- If it needs new secrets or providers: the boilerplate env list is fixed; the human must update the env section in **this file** first.
- If they name a concrete feature: implement **only** that feature; do not add unrelated modules or env vars.

---

## Repository layout (high level)

Assume a **monorepo** with at least:

- `packages/database` — Drizzle schema, `db` client, migrations (generated **in this repo** via that package’s scripts; migration filenames are whatever Drizzle produces when you run generate **here** — never copy numeric prefixes from another project).
- `packages/api` — HTTP API (Elysia): composition in `src/index.ts`, feature code under `src/modules/`.
- `apps/web` — Next.js: feature UI under `modules/<domain>/`, shared utilities under `utils/` or `lib/` as the repo already does.

The API imports `db` and schema types from the database package. The web app calls the API via a **typed client** (e.g. Eden) wired to the API — follow **existing files in the current repo**; do not invent a second HTTP layer.

---

## Dependencies — per-package upgrades (keep the template current)

When the human asks to **refresh dependencies**, **audit versions**, or **bring the template up to date**, follow this process. **Do not assume** a single root `package.json` is enough: in a monorepo, **`apps/*`** and **`packages/*`** each have their own manifests and must stay internally consistent.

### What “latest” means for this template

- When the human asks to bring the template **up to date**, aim for the **newest compatible stable** releases **as of the day you run the upgrade** (latest GA on the registry), not old minors “to be safe,” unless a known incompatibility blocks the bump.
- Still **avoid** nightlies, canaries, and `-rc` unless the human explicitly wants them.
- **Major upgrades are allowed and expected** when refreshing the template: apply them, fix breakages, and **prove** the repo works (checklist below). Do not leave the workspace on a half-upgraded dependency graph.

### Upgrade scope — every workspace package

1. **Enumerate** all `package.json` files under `apps/` and `packages/` (and the **repo root** if it declares dependencies).
2. **Update per package** (or use the workspace’s documented workflow: e.g. `bun update`, `pnpm up -r`, etc.—match what the template uses).
3. **Align compatibility groups** so peer/runtime expectations still match:
   - **Elysia stack:** `elysia`, `@elysiajs/cors`, `@elysiajs/openapi`, `@elysiajs/eden` on versions that **release notes or peer deps** indicate work together (same generation as the core `elysia` major/minor).
   - **Next.js / React:** `next`, `react`, `react-dom`, and **`@types/react` / `@types/react-dom`** (if used) on a **supported combination** for that Next version.
   - **UI motion:** e.g. **`framer-motion`** (or **`motion`**) on a release compatible with the repo’s **React** major.
   - **Auth:** `better-auth` compatible with your **Next** and **database** adapter setup.
   - **Data / ORM:** `drizzle-orm`, `drizzle-kit`, and the **driver** (`postgres`, etc.) on a supported trio; run migrations/generate if the kit requires it.
   - **Client data:** `@tanstack/react-query` with a React version it supports.
   - **TypeScript:** use one **workspace-wide** TS version where the monorepo expects it (root or shared config); resolve duplicate TS versions if tooling breaks.
4. **Deduplicate and hoisting:** avoid declaring the **same** runtime dependency in five places at conflicting ranges; prefer **workspace `*` / `workspace:*`** for internal packages. After edits, reinstall so the **lockfile** (`bun.lock`, `pnpm-lock.yaml`, etc.) reflects reality.

### API docs: `@elysiajs/openapi` only

- Use **only** [**`@elysiajs/openapi`**](https://elysiajs.com/plugins/openapi.html) for HTTP API documentation: it emits **OpenAPI 3** and serves **Scalar** by default. **Do not** add separate legacy “swagger” packages or parallel doc servers unless the human explicitly overrides this document.
- Keep **`openapi({ ... })`** registered on the main Elysia app (see **API package**) and maintain **`openapi-meta.ts`** (`documentation`, tags, servers).
- After upgrading `@elysiajs/openapi` or `elysia`, re-check **`exclude.paths`** and route **`detail.hide`** against the plugin’s current behavior.

### Verification checklist (mandatory after dependency changes)

Run whatever the template already defines; at minimum:

1. **Install** clean or reinstall per workspace rules.
2. **`check-types` / `tsc`** for affected packages (API, web, worker, database, auth).
3. **`lint`** if present.
4. **`build`** for apps that ship production bundles.
5. **Runtime smoke:** API **ping/health** responds; **auth** (e.g. Google sign-in flow) still completes; session cookies still work with **CORS + credentials** as configured.

If something fails, **roll back the offending bump** or fix code to match the new major’s API—do not leave the template in a broken middle state.

### What to tell the human

Summarize: which **packages** were touched, **major** bumps and why, link to **breaking-change** notes if relevant, and confirm the **checklist** passed.

---

## Better Auth — what the boilerplate implements

The template integrates **[Better Auth](https://www.better-auth.com/)** across the database, a shared auth package, the API, and the Next.js app. Treat this as the **only** auth stack unless a human explicitly decides to replace it. Wire it **in the current repository** per below; import paths use the **actual** database package name (e.g. `@<scope>/database` from that repo’s `package.json`).

### `packages/auth` (server)

- **`utils/auth.ts`** exports `auth` from `betterAuth({ ... })`.
- **Persistence:** **`drizzleAdapter`** from `better-auth/adapters/drizzle`, using `provider: "pg"` and schema **`user`**, **`session`**, **`account`**, **`verification`** imported from **`@<scope>/database`** (use the real package name).
- **Configuration:** `secret` from **`AUTH_SECRET`**; **`baseURL`** from **`NEXT_PUBLIC_BACKEND_URL`**; **`trustedOrigins`** from the public frontend URL(s) and backend URL (and any optional extra origins you documented in the env table).
- **Sign-in:** **`emailAndPassword.enabled: false`** in the default minimal setup; **Google** OAuth via **`GOOGLE_CLIENT_ID`** / **`GOOGLE_CLIENT_SECRET`** with scopes such as `email`, `profile`, `openid`.
- **Plugins:** **`openAPI()`** from `better-auth/plugins` (auth routes can be documented alongside your API OpenAPI setup).
- **Cookies:** If you use **`advanced.crossSubDomainCookies`**, set cookie **`domain`** from an env var **you** documented in the Early rules table (only if the target repo uses it).

### `packages/database` (auth tables)

- **`src/schema/auth.ts`** defines the Drizzle tables Better Auth expects: **`user`**, **`session`**, **`account`**, **`verification`**.
- The minimal **`user`** table may include only what Better Auth needs; a fork may add **extra columns** (billing IDs, plan tier, profile fields, etc.). Migrations and types must stay compatible with Better Auth; do not drop or rename core columns the adapter relies on without checking Better Auth’s schema expectations.

### `packages/api` (Elysia)

- **`src/utils/better-auth-plugin.ts`**:
  - **Mounts** `auth.handler` so Better Auth serves its HTTP API (paths under the app prefix, typically **`/api/auth/*`**).
  - Exposes an **`authenticated` macro**: calls **`auth.api.getSession({ headers })`**; if there is no session, responds with **401** and the standard **`apiError`** envelope; otherwise injects **`user`** and **`session`** on the route context.
- **`src/index.ts`** applies **`betterAuthPlugin`** at the app level (with CORS and the rest). OpenAPI for Elysia may **exclude** `/api/auth` because those routes are owned by Better Auth.
- **Protected JSON routes** (e.g. owner modules): chain **`.use(betterAuthPlugin)`** and set **`authenticated: true`** (or equivalent) on handlers that require a logged-in user.

### `packages/auth/client` and the web app

- **`client/index.ts`**: **`createAuthClient`** from `better-auth/react` with **`baseURL: process.env.NEXT_PUBLIC_BACKEND_URL`** and **`inferAdditionalFields<typeof auth>()`** so client typings match server-side **`auth`** (including additional `user` fields).
- **`getSession`**: uses **`getSessionCookie`** from `better-auth/cookies` with **`NextRequest`** for server-side session reads where needed.
- **`client/vanilla.ts`**: non-React **`createAuthClient`** when a non-React consumer needs the same API.
- **UI and actions** should use **`authClient`** (and helpers from this package) for sign-in, sign-out, and session — not ad hoc `fetch` to auth URLs unless the existing code already does.

### Guardrails for AI changes

- Do **not** add a second auth library or parallel session system.
- New social providers, email/password, or magic links require **explicit env and config** in **`packages/auth/utils/auth.ts`** (and often Early rules / `.env.example` updates).
- When adding protected API routes, reuse **`betterAuthPlugin`** and the **`authenticated`** pattern; keep responses aligned with **`apiSuccess` / `apiError`** where the rest of the API uses the envelope.

---

## Database package (`packages/database`)

**Purpose:** Single source of truth for Postgres schema and the `db` instance. The API uses this for all SQL. The frontend never imports `db`.

**Suggested folder layout:**

```
packages/database/
  index.ts                 # Re-exports: enums, schema, db client, drizzle helpers
  drizzle.config.ts
  migrate.ts               # If present
  src/
    client.ts              # postgres + drizzle({ schema })
    schema/
      index.ts             # Re-exports auth + domain (or a single schema file if tiny)
      auth.ts              # Tables required by Better Auth (or your auth adapter)
      domain.ts            # App business tables (boilerplate may be empty or minimal)
    enums/                 # Shared pg enums
    lib/                   # Connection URL, pooler helpers, etc.
```

**Rules:** New tables, columns, and enums live under `src/schema/` and `src/enums/` as appropriate. The **package root `index.ts`** is the only import path other packages should use. Run migrations with **this repository’s** documented commands (`drizzle-kit generate`, `migrate`, etc.); do not bypass that flow. **Never paste migration files from another repo** — generate fresh migrations in **this** repo so numbering and SQL match **this** schema history.

**Boilerplate content:** Beyond auth tables, keep `domain.ts` minimal **until** the human assigns a concrete feature (see **Human task — default “Notes” vertical slice** below).

---

## Reference task: “Notes” vertical slice (implement only when the human asks)

This is the **canonical first feature** to add to a fresh template so a developer sees **database → API (envelope + OpenAPI + Eden) → frontend (hooks + services + small components)** end-to-end. **Do not implement it** unless the **Human task** (or chat) explicitly requests the Notes feature or “the reference vertical slice.”

### 1) Database (`packages/database`)

- Add a table (example name: **`owner_notes`**, export e.g. **`ownerNotes`** in schema) with at least:
  - `id` (uuid, PK, default random)
  - `owner_id` (text, **FK → `user.id`**, not null)
  - `title` (varchar, max **120**, not null)
  - `body` (text, nullable)
  - `created_at` (timestamptz, not null, default now)
- Run **this repo’s** **Drizzle generate/migrate** workflow so a **new** migration exists here (new timestamp / serial — not copied from elsewhere).
- Do **not** add extra env vars for this feature.

### 2) API (`packages/api/src/modules/notes/`)

Mirror the standard module layout:

- **`notes.service.ts`** — class that uses **`db`** + **`ownerNotes`**: `listForOwner(ownerId)`, `createForOwner(ownerId, { title, body? })` with sensible truncation (title/body max lengths matching the schema).
- **`notes.module.ts`** — `.decorate({ notesService })`.
- **`notes.schema.ts`** — TypeBox: create body (`title` required, `body` optional), success envelopes via **`apiSuccessEnvelopeSchema`**, errors via **`apiErrorEnvelopeSchema`** (401/500 as needed).
- **`routes/owner.routes.ts`** — `Elysia` with prefix **`/notes/owner`**, **`.use(betterAuthPlugin)`**, **`.use(notesModule)`**:
  - **`GET /`** — `authenticated: true`, returns **`apiSuccess("…", { notes: rows })`**.
  - **`POST /`** — `authenticated: true`, body validated, returns **`apiSuccess("…", { note: row })`**.
- **`notes.routes.ts`** — barrel re-export **`ownerNotesRoutes`**.
- **`src/index.ts`** — **`.use(ownerNotesRoutes)`** (and keep **`export type Api = typeof api`**).
- **`openapi-meta.ts`** — add a tag (e.g. **`TemplateExample`** or **`Notes`**) and a short description; set **`detail.tags`** on both routes.

### 3) Frontend (`apps/web`)

- **`modules/notes/types/`** — DTOs matching **`data`** after unwrapping the envelope.
- **`modules/notes/service/notes-service.ts`** — **`apiClient`** from **`@/utils/api-connection`**: **`get()`** for list; **`post(payload)`** passes the **JSON body as the first argument** to Eden (match existing `*-service.ts` patterns in **this repo**—often **not** `{ body: { ... } }`). Reuse **`unwrapEnvelopeData`** and **`errorMessageFromUnknown`** like other services.
- **`modules/notes/hooks/`** — e.g. **`useOwnerNotesQuery`** (`queryKey: ['owner-notes']`), **`useCreateOwnerNoteMutation`** with **`invalidateQueries`** on success.
- **`modules/notes/components/`** — small pieces: header copy, form (title + optional body), list (loading/error/empty/card per row). **No `apiClient` in leaf components.**
- **`app/.../dashboard/notes/page.tsx`** (or your dashboard segment) — thin page composing those components.
- **Navigation** — one sidebar/link entry to **`/dashboard/notes`** (or equivalent).

### 4) Verification

- Typecheck API and web; confirm **`apiClient.notes.owner`** is inferred after **`Api`** updates.
- Smoke: logged-in user can **list** (empty at first) and **create** a note; data persists after refresh.

---

## API package (`packages/api`)

Stack: **Elysia** + **Better Auth** plugin + optional **OpenAPI**. If filenames differ slightly, keep the **same responsibilities** per file type.

**Root composition (`src/index.ts`):** Build the Elysia app with a global prefix (e.g. `/api`). Apply the auth plugin, CORS (allowed origins from the frontend URL(s) already coded), route plugins for **ping** and **auth**, and OpenAPI if enabled. Do not register domain routers that are not part of an explicit human task in this boilerplate.

**Global utilities (`src/utils/`):** Typical pieces include env validation (only the env table in this document), Better Auth plugin, **`api-envelope.ts`** / **`api-envelope.schema.ts`** (see **API response envelope** below), **`openapi-meta.ts`**, and any shared helpers. Owner JSON routes must use that envelope for success and errors.

### Eden — typed HTTP client (`src/eden/`)

The API package ships a **single factory** for the frontend’s type-safe client ([**Eden Treaty**](https://elysiajs.com/eden/overview.html) / `@elysiajs/eden`):

- **`src/eden/index.ts`** imports the **`Api`** type from **`src/index.ts`** (`export type Api = typeof api` must remain the public contract).
- **`createApiClient(baseUrl)`** calls **`treaty<Api>(baseUrl, { fetch: { credentials: "include" } }).api`** so requests send **cookies** (required for Better Auth session cookies on owner routes).
- The web app imports **`createApiClient`** from **`@<scope>/api/src/eden`** (or your package’s equivalent path) and creates **one shared `apiClient`** bound to **`NEXT_PUBLIC_BACKEND_URL`**.

**Cross-stack requirements (AI must preserve):**

1. **CORS on the API** must allow the frontend origin and **`credentials: true`** so `credentials: "include"` from the browser is not stripped.
2. **Same envelope + typed routes:** Eden infers paths and bodies from the Elysia app; keep **`response` schemas** accurate so the client types match runtime JSON.
3. In **any** repository following this template, **keep `eden/` (or the same idea) inside the API package** so there is one versioned import for the app—do not duplicate ad hoc `fetch` wrappers for first-party JSON routes.

**Per-domain module layout** (use when a human **explicitly** requests a new domain):

```
src/modules/<domain>/
  <domain>.module.ts       # Elysia: .decorate({ <domain>Service })
  <domain>.service.ts      # Class: DB via `db`; domain logic; no HTTP types
  <domain>.schema.ts       # Elysia TypeBox (t.*); query/body/response; envelope wrappers for responses
  <domain>.routes.ts       # Barrel: re-export route groups (e.g. owner routes)
  routes/
    owner.routes.ts        # prefix e.g. /<domain>/owner; .use(auth); .use(module); handlers
  lib/                     # Optional: domain errors, pure helpers
  utils/                   # Optional: query parsing, pagination meta
  types/                   # Optional: extra TS types
```

**Wiring:** The service is a singleton (or single instance) decorated on the module. Owner routes use `betterAuthPlugin` and the domain module. Handlers call the service, return `apiSuccess(message, data)` or set status and return `apiError(status, message)`. Schemas drive validation and OpenAPI. Register new route barrels only in `index.ts` when that domain is in scope.

**Ping** in the boilerplate stays minimal (small `modules/ping/`; no DB unless already required).

**Auth:** Better Auth is mounted via **`betterAuthPlugin`** (see **Better Auth — what the boilerplate implements**). Owner routes use that plugin and `authenticated: true` where applicable.

---

## API response envelope (contract)

All **first-party JSON routes** in this pattern use one response contract so the typed client (Eden) and the frontend can handle success and errors the same way everywhere. **Replicate this contract verbatim** in a repository that adopts this doc: same keys, same types, and **no extra top-level fields** on success or error bodies unless the whole stack is updated together.

### Canonical JSON shapes

**Success (HTTP 2xx, typically 200):**

```json
{
  "success": true,
  "status": 200,
  "message": "Human-readable summary",
  "data": { }
}
```

- **`data`** is the only place for payload (entities, lists, counts, pagination meta, etc.).
- **`status`** in the body is the literal **200** on success (not a duplicate of arbitrary HTTP codes).

**Error (HTTP 4xx / 5xx):**

```json
{
  "success": false,
  "status": 401,
  "message": "Human-readable error"
}
```

- **No `data` field** on errors.
- The numeric **`status` inside the JSON must match** the HTTP status you set on the response (e.g. `set.status` in Elysia). Example: unauthenticated owner routes use **401** with `apiError(401, "…")`.

### Expected files — `packages/api/src/utils`

| File | Role |
|------|------|
| **`api-envelope.ts`** | Runtime helpers: **`apiSuccess(message, data)`** and **`apiError(status, message)`**. TypeScript types **`ApiSuccessBody<T>`** and **`ApiErrorBody`**. |
| **`api-envelope.schema.ts`** | Elysia TypeBox builders: **`apiSuccessEnvelopeSchema(dataSchema)`** for typed `data`; **`apiSuccessAnyDataSchema`** when `data` is **`t.Any()`**; **`apiErrorEnvelopeSchema(statusCode)`** per HTTP code you document on the route; **`listPaginationMetaSchema`** for list `data.pagination` (current page, totals, next/previous page, flags). |
| **`openapi-meta.ts`** | **`openApiDocumentation`**: OpenAPI `info.description` includes the same contract text (so **Scalar** via `@elysiajs/openapi` documents the envelope); **`openApiTags`** constants for **`detail.tags`** on routes; optional **`servers`** from backend URL. |

Implement or align these files **in the target repo**; do not assume they already match another clone.

### Handler rules (AI must follow)

1. **Success:** `return apiSuccess("…", payload)` — never return raw `payload` without the envelope for owner JSON APIs that adopt this standard.
2. **Error:** `set.status = <code>` (or framework equivalent) and `return apiError(<code>, "…")` with the **same** `<code>` in both places.
3. **Route `response` schemas:** For each status you return, declare the matching schema — e.g. **`200: apiSuccessEnvelopeSchema(yourDataSchema)`**, **`401: apiErrorEnvelopeSchema(401)`**, **`500: apiErrorEnvelopeSchema(500)`** — so OpenAPI and Eden stay accurate.
4. **Better Auth macro:** Session failures already return **401** with **`apiError`**; keep that shape for any new auth-style guards.
5. **Lists:** Put the array and any **`pagination`** object **inside `data`**, using **`listPaginationMetaSchema`** (or the same field names and types) so list UIs and services stay consistent.

### OpenAPI documentation

- In **`openapi-meta.ts`**, the **`envelopeDoc`** block states that all own JSON routes use the success/error envelope and that owner routes use Better Auth cookies with **401** on missing session.
- Add a **tag** in **`openApiTags`** (and in **`documentation.tags`**) for each resource area; reference it from route **`detail.tags`**.
- Keep a **short description of the envelope** in OpenAPI `info.description` (or equivalent) so generated docs match runtime behavior.

### Replicating in another repository (not Elysia)

- Keep the **exact JSON shapes** above; implement helpers in whatever validates responses (Zod, manual types, etc.).
- Map **`apiSuccessEnvelopeSchema` / `apiErrorEnvelopeSchema`** to your validator’s composable patterns; the important part is **runtime output**, not the library.
- **Do not** mix this envelope with Problem Details, raw strings, or ad hoc `{ error: "…" }` on the same route group without a migration plan.

### Frontend alignment

- Services should **unwrap** the envelope: if `success === false`, surface **`message`**; if `success === true`, use **`data`** only.
- Follow **`apps/web/modules/*/service/*-service.ts`** patterns in **the current repo** (e.g. `unwrapEnvelopeData`) so list and detail calls behave the same for every module.

---

## Frontend app (`apps/web`)

### App router vs feature modules

- **`app/`** (Next.js App Router): layouts, route segments, and **page-level composition**—wire providers, fetch boundaries, and glue **modules** together.
- **`modules/<domain>/`**: **feature code**—services, hooks, stores, and components for one domain. Avoid dumping domain logic in `app/` beyond imports and layout.

### Per-domain feature folder (when a domain is explicitly implemented)

```
apps/web/modules/<domain>/
  types/<domain>.types.ts
  service/<domain>-service.ts   # Uses apiClient; unwrap envelope; normalize errors
  hooks/use-<resource>.ts       # TanStack Query; queryKey includes filters + page + limit
  store/use-<resource>-filters.ts  # Optional: Zustand for filters + pagination
  components/                   # See “Atomic components” below
  lib/                          # Presentation/formatting helpers (no fetch)
```

### `apps/web/utils` (shared web helpers)

Keep **cross-feature, reusable** pieces here. Typical files:

| File | Role |
|------|------|
| **`api-connection.ts`** | Builds the singleton **`apiClient`** via **`createApiClient(process.env.NEXT_PUBLIC_BACKEND_URL!)`** from the API package’s **`src/eden`**. All module services import **`apiClient`** from here—not from `@/modules/...`—so URLs and Eden options stay in one place. |
| **`normalize-error.ts`** | **`errorMessageFromUnknown(value, fallback)`** — turns Eden errors, `Error`, strings, or `{ message }` into a user-safe string for toasts and thrown `Error` messages. |
| **`auth-connection.ts`** | Thin helpers that delegate to the **auth module** (e.g. `signInWithGoogle`); keeps `app/` and layouts free of auth implementation details. |
| **`use-active-route.ts`** | Client hook for sidebar/nav **active** segment styling (rules can be app-specific in a fork). |
| **`use-debounce.ts`** | Generic debounced value for search/filter inputs. |

**AI rules:** New API calls go through **`api-connection`**’s client (or a single replacement file). Do not create a second Eden instance with different `fetch` options. Add new `utils/` files only when **two or more** features need the same behavior.

### Eden on the frontend (how it connects)

1. **Env:** **`NEXT_PUBLIC_BACKEND_URL`** must match the API base URL (scheme + host + port), no path suffix required for `treaty` if your app is mounted at `/api` on that host (match **this repo’s** API prefix).
2. **Imports:** `import { createApiClient } from "@<scope>/api/src/eden"` (use the real workspace package name).
3. **Services** call **`apiClient.<path>.<method>({ query, body })`**, check **`response.error`**, unwrap **`response.data`** through the **envelope** helpers (see **API response envelope** → Frontend alignment).
4. **Cookies:** Because Eden uses **`credentials: "include"`**, session cookies set by Better Auth on the API domain must be valid for the browser’s request (SameSite / secure / domain as configured in **`packages/auth`**).

### Atomic, composable components

Goal: **small pieces, clear boundaries**, easy reuse and testing—without a rigid “design system” ceremony.

**Do:**

- **One main responsibility per file:** e.g. `audit-status-badge.tsx` only renders status → label/color; `audit-row.tsx` composes cells and maybe a badge; `audits-list.tsx` maps rows and handles empty state via smaller components.
- **Leaf components are presentational:** receive **props** or read **narrow hooks** (e.g. only Zustand selectors for UI state). Avoid embedding `useQuery` +80 lines of markup in one file—split **data** (`useAuditsQuery`) from **presentation** (`AuditsList`).
- **Compose upward:** badge + label → row → table body → list frame (header, filters slot, pagination). **Pages** in `app/` stay thin: render layout + one or two containers from `modules/`.
- **Colocate:** domain-only UI under **`modules/<domain>/components/`**; truly global primitives (buttons, inputs from a UI kit) live under something like **`components/ui/`** if the repo has it.
- **Filters:** prefer **one small component per filter** (or one generic `Select` wrapper) wired to the store or controlled props—not a single “god” filter panel that also fetches data.

**Don’t:**

- Call **`apiClient`** from random components; use **`service/`** + **`hooks/`**.
- Duplicate envelope-unwrapping in every component; centralize in the **service** layer.
- Mix unrelated domains in one component tree (e.g. billing widgets inside an audits list) without an explicit shared layout.

### List + filters + pagination (when you implement a list later)

Zustand holds `page`, `limit`, and filter fields with sane bounds; changing filters resets `page` to 1. The **service** builds string query params for the API. React Query’s **`queryKey`** must include every filter and pagination field. **Components** consume hooks and store actions only.

### Boilerplate scope

By default, only **auth** UI and any **ping** UI. **Exception:** when the human assigns the **Notes** reference task (below), implement that slice fully—it is the teaching example, not optional product scope.

### Imports

Use the repo alias (e.g. `@/modules/...`, `@/utils/...`).

---

## Future features (conceptual — do not build unless asked)

For domains **other than** the **Notes** reference slice: same order of work—database schema and migrate → API service, schemas, owner routes, module, barrel, register in `index.ts` (keep **`export type Api`**) → confirm **Eden** still type-checks → web types, service (via **`apiClient`**), optional store, hooks, atomic components, thin page under `app/`. The **Notes** task is fully specified in **Reference task: “Notes” vertical slice**; do not invent a second “example” domain without the human asking.

---

## Default when the task is vague

Prefer small changes that respect this document. **Ping + auth** only; no extra env vars; no extra modules—**unless** the human pasted the **Notes** default task or an equivalent explicit request, in which case implement **Reference task: “Notes” vertical slice** completely.

---

## Human task

Paste the specific task below (or in chat).

- For **dependency / version upgrades**, follow **Dependencies — per-package upgrades (keep the template current)** above (newest compatible **stable** releases **as of that day**, per workspace package).
- For the **reference “Notes” feature** (database + API + dashboard UI), follow **Reference task: “Notes” vertical slice** above end-to-end.

### Default task text (copy for a new template)

```text
You are working ONLY in this repository (the boilerplate). Do not use any other project as a reference.

Implement the full “Notes” reference vertical slice described in boilerplateinstructions.md (or BOILERPLATE_INSTRUCTIONS.md): add the owner_notes table and a new migration via this repo’s Drizzle workflow, the notes API module (GET list + POST create under /notes/owner with Better Auth, envelope, and @elysiajs/openapi tags), register routes in the API index, then add apps/web/modules/notes (types, service via Eden, hooks, atomic components) and a dashboard page + nav link. Use this repo’s package names for imports. Run typecheck and fix any Eden client typing issues. Do not add new environment variables.
```

<!-- Task: ... -->
