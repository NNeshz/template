import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { env } from "./utils/envs";

import { betterAuthPlugin } from "./utils/better-auth-plugin";
import { openApiDocumentation } from "./utils/openapi-meta";

const allowedOrigins = [env.NEXT_PUBLIC_FRONTEND].filter(
  (origin): origin is string => Boolean(origin),
);

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

export type Api = typeof api;