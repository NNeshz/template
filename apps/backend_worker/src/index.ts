import { api } from "@template/api/src";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(api)
  .use(
    swagger({
      path: "/api/swagger",
    })
  )
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);