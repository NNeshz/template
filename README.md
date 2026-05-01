# @template

Monorepo full-stack con Next.js 16, Hono, Better Auth, Drizzle ORM y Bun.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router) |
| Backend | Hono + Elysia (Eden Treaty) |
| Auth | Better Auth + Google OAuth |
| Base de datos | PostgreSQL + Drizzle ORM |
| UI | shadcn/ui + Tabler Icons |
| Monorepo | Turborepo + Bun Workspaces |

## Estructura

```
apps/
  web/              # Next.js 16 — frontend + dashboard
  backend_worker/   # Hono — API server
packages/
  api/              # Definición de rutas y cliente Eden
  auth/             # Configuración de Better Auth
  database/         # Schema Drizzle + cliente PostgreSQL
  ui/               # Librería de componentes (shadcn/ui)
  env/              # Validación centralizada de variables de entorno
  typescript-config/ # tsconfig base compartida
```

## Primeros pasos

### 1. Renombrar el scope del monorepo

Reemplaza `@template` por el nombre de tu app en todos los archivos:

```bash
find . -not -path "*/node_modules/*" -not -path "*/.next/*" \
  -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.json" \) \
  -exec sed -i '' 's/@template/@miapp/g' {} +
```

Luego cambia `appName` en `packages/auth/src/utils/auth.ts`:

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

NEXT_PUBLIC_BACKEND=http://localhost:8080
NEXT_PUBLIC_FRONTEND=http://localhost:3000

GOOGLE_CLIENT_ID=             # Google Cloud Console → Credenciales → OAuth 2.0
GOOGLE_CLIENT_SECRET=
```

### 3. Instalar dependencias

```bash
bun install
```

### 4. Inicializar la base de datos

```bash
bun run db:push
```

### 5. Levantar el proyecto

```bash
bun run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

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
bun run db:push      # aplica el schema directamente (ideal para desarrollo)
bun run db:generate  # genera archivos de migración
bun run db:migrate   # aplica las migraciones pendientes
bun run db:studio    # abre Drizzle Studio en el navegador
```

### UI — agregar componentes shadcn

```bash
bun run ui:add button
bun run ui:add dialog input label
```

Los componentes se instalan en `packages/ui/src/components/` y quedan disponibles para toda la app vía `@template/ui/components/<nombre>`.
