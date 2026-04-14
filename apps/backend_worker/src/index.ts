import { api } from "@template/api/src/index";
import { Elysia } from "elysia";

const app = new Elysia().use(api).listen(8080);

console.log(
  `Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
