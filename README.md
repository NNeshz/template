# @template

Monorepo full-stack con Next.js, Elysia, Better Auth, Drizzle ORM y Bun.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js (App Router) |
| Backend | Elysia + Eden Treaty (cliente tipado) |
| Auth | Better Auth + Google OAuth + RBAC |
| Base de datos | PostgreSQL + Drizzle ORM |
| UI | shadcn/ui + Tabler Icons |
| Monorepo | Turborepo + Bun Workspaces |

## Estructura

```
apps/
  web/               # Next.js — frontend + dashboard
  backend_worker/    # Worker Bun — tareas en segundo plano
packages/
  api/               # Rutas Elysia + cliente Eden tipado
  auth/              # Better Auth — config, RBAC, roles
  database/          # Schema Drizzle + cliente PostgreSQL
  ui/                # Librería de componentes (shadcn/ui)
  typescript-config/ # tsconfig base compartida
```

## Primeros pasos

### 1. Renombrar el scope del monorepo

```bash
bun run rename miapp
```

El script reemplaza `@template` → `@miapp` en todos los archivos relevantes (`.ts`, `.tsx`, `.js`, `.json`, `.css`) y confirma al final que no quedó ninguna referencia suelta.

Actualiza también `appName` en `packages/auth/src/utils/auth.ts`:

```ts
appName: "miapp",
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/miapp

BETTER_AUTH_SECRET=           # genera con: openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:8080

NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND_WWW=     # opcional — URL www en producción

# Solo producción — incluir el punto inicial: .miapp.com
COOKIE_DOMAIN=

GOOGLE_CLIENT_ID=             # Google Cloud Console → Credenciales → OAuth 2.0
GOOGLE_CLIENT_SECRET=
```

### 3. Instalar dependencias

```bash
bun install
```

### 4. Inicializar la base de datos

Genera las migraciones y aplícalas:

```bash
bun run db:generate
bun run db:migrate
```

> `db:push` también está disponible para iterar el schema rápido en desarrollo local,
> pero saltárselo en el setup inicial deja el proyecto sin historial de migraciones baseline.

### 5. Levantar el proyecto

```bash
bun run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

---

## RBAC — Control de acceso por roles

Los roles disponibles están definidos en `packages/auth/src/utils/rbac.ts`.
Por defecto el template incluye: `owner`, `admin`, `manager`, `employee`.

Para proteger una ruta en el backend:

```ts
// Cualquier usuario autenticado
.get("/perfil", handler, { authenticated: true })

// Solo usuarios con el permiso indicado
.post("/usuarios", handler, { authorized: { users: ["create"] } })
```

Para añadir nuevos recursos, edita `statement` en `rbac.ts` y asigna permisos a los roles.

---

## Comandos

### Desarrollo

```bash
bun run dev          # levanta todos los apps en paralelo
bun run build        # build de producción
bun run check-types  # verifica tipos en todo el monorepo
bun run lint         # lint en todo el monorepo
bun run clean        # elimina .next, .turbo y node_modules
```

### Base de datos

```bash
bun run db:push      # aplica el schema directamente (desarrollo)
bun run db:generate  # genera archivos de migración en packages/database/drizzle/
bun run db:migrate   # aplica las migraciones pendientes
bun run db:studio    # abre Drizzle Studio en el navegador
```

### UI — agregar componentes shadcn

```bash
bun run ui:add button
bun run ui:add dialog input label
```

Los componentes se instalan en `packages/ui/src/components/` y quedan disponibles para toda la app vía `@template/ui/components/<nombre>`.

### API — agregar módulos

Crea el módulo en `packages/api/src/modules/<nombre>/routes.ts` y encadénalo en `packages/api/src/index.ts`:

```ts
export const api = new Elysia({ prefix: "/api" })
  .use(betterAuthPlugin)
  ...
  .use(miModulo); // siempre encadenar aquí para que Eden tome los tipos

export type Api = typeof api;
```
