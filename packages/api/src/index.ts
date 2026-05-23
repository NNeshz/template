import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { env } from "./utils/envs";

import { betterAuthPlugin } from "./utils/better-auth-plugin";
import { openApiDocumentation } from "./utils/openapi-meta";

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
  );

/**
 * How to add new modules:
 *   import { myModule } from "./modules/my-module/routes";
 *   export const api = new Elysia(...)
 *     .use(betterAuthPlugin)
 *     ...
 *     .use(myModule);   // ← always chain on the same expression
 *
 * Api = typeof api will automatically include all chained modules.
 *
 * IMPORTANT — inside route handlers always use status() not error():
 *   import { status } from "elysia";
 *   .get("/x", ({ params }) => {
 *     if (!found) return status(404, apiError(404, "Not found"));
 *   })
 * error() loses its type when the authenticated/authorized macro is active.
 */
export type Api = typeof api;
