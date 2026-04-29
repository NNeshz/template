import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../schema/index";
import { getRuntimeDatabaseUrl } from "../lib/runtime-database-url";
import { isTransactionPoolerUrl } from "../lib/pooler";

const dbUrl = getRuntimeDatabaseUrl();
const queryClient = postgres(dbUrl, {
  prepare: !isTransactionPoolerUrl(dbUrl),
});

export const db = drizzle(queryClient, { schema });

export type Database = typeof db;