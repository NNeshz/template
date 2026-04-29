/**
 * URL directa a Postgres (sin PgBouncer en 6543) para drizzle-kit, `migrate.ts` y `devreset`.
 * Prefiere `DIRECT_URL` si está definida.
 */
export function resolveDirectDatabaseUrl(): string {
  const directUrl = process.env.DIRECT_URL;
  if (directUrl) return directUrl;

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error(
      "DATABASE_URL or DIRECT_URL is required (p. ej. fly secrets set DATABASE_URL=... antes de fly deploy).",
    );
  }

  if (dbUrl.includes(":6543")) {
    return dbUrl
      .replace(":6543", ":5432")
      .replace(/[?&]pgbouncer=true/, "")
      .replace(/[?&]pgbouncer=false/, "");
  }

  return dbUrl;
}