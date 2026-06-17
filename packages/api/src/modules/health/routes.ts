import { Elysia } from "elysia";
import { apiSuccess } from "../../utils/api-envelope";
import { healthResponseSchema } from "./schema";
import { getHealth } from "./service";

/**
 * Canonical module shape:
 *   - `routes.ts`   → thin HTTP layer, exports `<name>Module`.
 *   - `service.ts`  → business logic.
 *   - `schema.ts`   → TypeBox validations.
 *
 * The export MUST be named `<camelCaseFolder>Module` (here `healthModule`); the
 * codegen in `scripts/gen.ts` discovers it and mounts it automatically — you do
 * not edit `packages/api/src/index.ts`.
 */
export const healthModule = new Elysia({ prefix: "/health", name: "health-module" }).get(
  "/",
  () => apiSuccess("ok", getHealth()),
  {
    response: { 200: healthResponseSchema },
    detail: { tags: ["Health"], summary: "Liveness probe" },
  },
);
