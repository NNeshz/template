import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { env } from "./utils/envs";

import { betterAuthPlugin } from "./utils/better-auth-plugin";
import { openApiDocumentation } from "./utils/openapi-meta";
import { modules } from "./modules";

const allowedOrigins = [
  env.NEXT_PUBLIC_FRONTEND_URL,
  env.NEXT_PUBLIC_FRONTEND_WWW,
  env.NEXT_PUBLIC_BACKEND_URL,
].filter((origin): origin is string => Boolean(origin));

export const api = new Elysia({
  prefix: "/api",
})
  .use(betterAuthPlugin)
  .use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
    }),
  )
  .use(
    openapi({
      path: "/openapi",
      documentation: openApiDocumentation,
      exclude: {
        /** Better Auth monta su propio handler; rutas `/api/auth/*` vienen del mount. */
        paths: [/\/api\/auth\b/],
      },
    }),
  )
  .use(modules);

/**
 * How to add new modules:
 *   1. Create packages/api/src/modules/<name>/routes.ts exporting `<name>Module`
 *      (plus service.ts + schema.ts) — see modules/health for the canonical shape.
 *   2. Run `bun run gen` (or just `bun run dev` / `bun run check-types`, which
 *      run it first). The generated `./modules` barrel mounts it here automatically.
 *
 * You never edit this file to add a module. `Api = typeof api` includes every
 * module because the generated barrel chains them statically.
 *
 * IMPORTANT — inside route handlers always use status() not error():
 *   import { status } from "elysia";
 *   .get("/x", ({ params }) => {
 *     if (!found) return status(404, apiError(404, "Not found"));
 *   })
 * error() loses its type when the authenticated/authorized macro is active.
 */
export type Api = typeof api;
