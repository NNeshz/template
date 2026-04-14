import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import "./utils/envs";
import { env } from "./utils/envs";

import { betterAuthPlugin } from "./utils/better-auth-plugin";
import { openApiDocumentation } from "./utils/openapi-meta";
import { pingRoutes } from "./modules/ping/ping.routes";
import { ownerNotesRoutes } from "./modules/notes/notes.routes";

const allowedOrigins = [env.NEXT_PUBLIC_FRONTEND_URL].filter(
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
  .use(pingRoutes)
  .use(ownerNotesRoutes)
  .use(
    openapi({
      path: "/openapi",
      documentation: openApiDocumentation,
      exclude: {
        paths: [/\/api\/auth\b/],
      },
    }),
  );

export type Api = typeof api;
