import { defineConfig } from "drizzle-kit";
import { resolveDirectDatabaseUrl } from "@/lib/direct-database-url";

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: resolveDirectDatabaseUrl(),
  },
});
