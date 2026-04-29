/** URL de conexión en runtime (pooler permitido). Usada por el cliente Drizzle. */
export function getRuntimeDatabaseUrl(): string {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL is required");
  return dbUrl;
}