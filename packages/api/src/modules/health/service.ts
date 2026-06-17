/**
 * Health module service.
 *
 * Even when trivial, modules keep business logic in `service.ts` so `routes.ts`
 * stays a thin HTTP layer. This is the canonical structure every module follows.
 */
export function getHealth() {
  return {
    status: "healthy",
    uptime: process.uptime(),
  };
}
