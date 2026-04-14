import { api } from "@template/api/src";
import { Elysia } from "elysia";

const port = Number(process.env.PORT) || 8080;

const app = new Elysia().use(api).listen({ port, hostname: "0.0.0.0" });

console.log(
  `🦊 Elysia at ${app.server?.hostname}:${app.server?.port} — OpenAPI (Scalar): /api/openapi — spec JSON: /api/openapi/json`,
);