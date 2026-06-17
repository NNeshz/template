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
  backend_worker/    # Servidor Bun que sirve la API Elysia (puerto 8080)
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

// Solo usuarios con los permisos indicados (string "recurso.acción", con autocompletado)
.post("/usuarios", handler, { authorized: ["users.create"] })
.get("/clientes", handler, { authorized: ["clientes.view"] })
```

Los permisos son strings `"<recurso>.<acción>"` derivados del `statement`, así que
`authorized([...])` y `can(role, [...])` tienen autocompletado completo.

**Cómo se componen los roles.** En `rbac.ts` hay un `statement` base (`users`,
`settings`) y un `moduleStatements` donde cada módulo aporta **una sola línea**.
Los roles **no** se editan al agregar un módulo: se componen automáticamente desde
una política (`modulePolicy`):

- `owner` / `admin`: acceso total a cada módulo.
- `manager`: todo excepto `delete`.
- `employee`: sin acceso a módulos por defecto (hay que concederlo explícitamente).

En el frontend, importa `can` desde `@template/auth/rbac` (entrypoint client-safe)
para esconder ítems del sidebar según el rol — ya está cableado en la sidebar.

---

## Comandos

### Desarrollo

```bash
bun run dev          # levanta todos los apps en paralelo (corre `gen` antes)
bun run build        # build de producción (corre `gen` antes)
bun run check-types  # verifica tipos en todo el monorepo (corre `gen` antes)
bun run gen          # regenera los barrels declarativos (schema, módulos API, sidebar)
bun run lint         # lint en todo el monorepo
bun run clean        # elimina .next, .turbo y node_modules
```

`bun run gen` (`scripts/gen.ts`) escanea el filesystem y regenera tres barrels para
que agregar un módulo no requiera editar archivos de integración a mano:

- `packages/database/src/schema/index.ts` — re-exporta cada archivo de schema.
- `packages/api/src/modules/index.ts` — monta cada módulo de la API.
- `apps/web/modules/dashboard-modules.generated.ts` — carga el registro del sidebar.

Se ejecuta automáticamente antes de `dev`, `build`, `check-types`, `db:generate` y
`db:push`, así que normalmente no hace falta llamarlo a mano.

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

---

## Cómo agregar un módulo nuevo

Los puntos de integración son **declarativos**: agregar un módulo (`productos`,
`citas`, etc.) es crear archivos en sus carpetas + correr `bun run gen`. No se
editan `index.ts`, `dashboard-sidebar-data.ts` ni la sidebar. El único punto
manual de RBAC es **una línea** en `rbac.ts` (ver nota más abajo).

Tomando `clientes` como plantilla, para un módulo `productos`:

**1. Tabla (Drizzle)** — `packages/database/src/schema/productos.ts`

```ts
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const productos = pgTable("productos", {
  id: t.text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: t.text("name").notNull(),
  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull().defaultNow(),
});
```

**2. Permiso RBAC** — agrega **una línea** a `moduleStatements` en
`packages/auth/src/utils/rbac.ts` (los roles se componen solos):

```ts
const moduleStatements = {
  clientes:  ["view", "create", "update", "delete"],
  productos: ["view", "create", "update", "delete"], // ← única línea nueva
} as const;
```

**3. Módulo de API** — `packages/api/src/modules/productos/` con `routes.ts`
(exporta `productosModule`), `service.ts` y `schema.ts`. Cada módulo hace
`.use(betterAuthPlugin)` para tener la macro `authorized` en scope:

```ts
export const productosModule = new Elysia({ prefix: "/productos", name: "productos-module" })
  .use(betterAuthPlugin)
  .get("/", async () => apiSuccess("ok", await listProductos()), {
    authorized: ["productos.view"],
  });
```

**4. Entry del sidebar** — `apps/web/modules/productos/dashboard.ts`:

```ts
import { IconBox } from "@tabler/icons-react";
import { registerDashboardModule } from "@/modules/dashboard/data/dashboard-sidebar-data";

registerDashboardModule({
  title: "Productos",
  url: "/dashboard/productos",
  icon: IconBox,
  permission: "productos.view", // RBAC: se esconde si el rol no tiene el permiso
});
```

**5. Página** — `apps/web/app/(private)/(dashboard)/dashboard/productos/page.tsx`
(y opcionalmente `apps/web/modules/productos/` con el componente y el service de fetch).

**6. Regenerar + migrar:**

```bash
bun run gen          # monta el módulo API + registra el sidebar + actualiza el barrel de schema
bun run db:generate  # genera la migración de la tabla productos
bun run db:migrate   # la aplica
```

### Nota sobre RBAC (tradeoff)

`rbac.ts` vive en `@template/auth`, que **no puede importar** desde `@template/api`
(sería dependencia circular), y Better Auth congela `ac`/`roles` en tiempo de
import. Eso hace imposible un `registerModulePermissions()` en runtime **sin perder**
el autocompletado de `authorized([...])`. Por eso el permiso del módulo se declara
con una línea literal en `moduleStatements` (tipado fuerte) en vez de registro
dinámico. Es el único archivo de integración con una edición manual; todo lo demás
(schema, montaje de API, sidebar) es cero-edición vía `bun run gen`.
