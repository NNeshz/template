/** Supabase pooler / PgBouncer (modo transacción): desactivar prepared statements en el cliente. */
export function isTransactionPoolerUrl(url: string): boolean {
  return url.includes(":6543") || /[?&]pgbouncer=true/i.test(url);
}