import { Elysia, t } from "elysia";
import { apiSuccess } from "../../utils/api-envelope";
import { apiSuccessEnvelopeSchema } from "../../utils/api-envelope.schema";
import { openApiTags } from "../../utils/openapi-meta";

const pingDataSchema = t.Object({
  ok: t.Literal(true),
});

export const pingRoutes = new Elysia({
  name: "pingRoutes",
  prefix: "/ping",
}).get(
  "/",
  () => apiSuccess("ok", { ok: true as const }),
  {
    response: {
      200: apiSuccessEnvelopeSchema(pingDataSchema),
    },
    detail: {
      summary: "Health check",
      description: "Comprueba que la API responde.",
      tags: [openApiTags.Health],
    },
  },
);
