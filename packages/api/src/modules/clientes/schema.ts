import { t } from "elysia";

/** Body accepted by `POST /api/clientes`. */
export const createClienteSchema = t.Object({
  name: t.String({ minLength: 1 }),
  email: t.String({ format: "email" }),
  phone: t.Optional(t.String()),
});

/** Public shape of a cliente returned by the API. */
export const clienteSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  phone: t.Union([t.String(), t.Null()]),
  createdAt: t.Date(),
});
