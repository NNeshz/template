import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@template/database/schema/index";
import { getRuntimeDatabaseUrl } from "@template/database/lib/runtime-database-url";
import { isTransactionPoolerUrl } from "@template/database/lib/pooler";

const dbUrl = getRuntimeDatabaseUrl();
const queryClient = postgres(dbUrl, {
  prepare: !isTransactionPoolerUrl(dbUrl),
});

export const db = drizzle(queryClient, { schema });

export type Database = typeof db;