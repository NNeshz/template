import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const clientes = pgTable("clientes", {
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: t.text("name").notNull(),
  email: t.varchar("email", { length: 255 }).notNull(),
  phone: t.varchar("phone", { length: 50 }),
  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});
