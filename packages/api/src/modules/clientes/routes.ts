import { Elysia } from "elysia";
import { apiSuccess } from "../../utils/api-envelope";
import { betterAuthPlugin } from "../../utils/better-auth-plugin";
import { createClienteSchema } from "./schema";
import { createCliente, listClientes } from "./service";

/**
 * Clientes module — example CRUD following the canonical module pattern.
 *
 * `.use(betterAuthPlugin)` brings the `authorized` macro into scope (it is
 * deduped by name, so mounting it in every module is free). Pass dotted
 * permissions to `authorized([...])` — they are autocompleted from the RBAC
 * statement in `@template/auth`.
 */
export const clientesModule = new Elysia({ prefix: "/clientes", name: "clientes-module" })
  .use(betterAuthPlugin)
  .get("/", async () => apiSuccess("ok", await listClientes()), {
    authorized: ["clientes.view"],
    detail: { tags: ["Clientes"], summary: "List clientes" },
  })
  .post(
    "/",
    async ({ body }) => apiSuccess("Cliente creado", await createCliente(body)),
    {
      authorized: ["clientes.create"],
      body: createClienteSchema,
      detail: { tags: ["Clientes"], summary: "Create cliente" },
    },
  );
