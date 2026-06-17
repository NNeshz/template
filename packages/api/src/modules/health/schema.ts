import { t } from "elysia";
import { apiSuccessSchema } from "../../utils/api-envelope";

/** Shape of the `data` payload returned by `GET /api/health`. */
export const healthDataSchema = t.Object({
  status: t.String(),
  uptime: t.Number(),
});

/** Full success-envelope schema for the health endpoint. */
export const healthResponseSchema = apiSuccessSchema(healthDataSchema);
