import { defineConfig } from "drizzle-kit";
import { resolveDirectDatabaseUrl } from "./src/lib/direct-database-url";

export default defineConfig({
  schema: ["./src/schema/auth.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: resolveDirectDatabaseUrl(),
  },
});
