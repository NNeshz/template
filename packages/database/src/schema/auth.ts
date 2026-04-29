import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: t.text("id").primaryKey(),
	name: t.text("name").notNull(),
	email: t.varchar("email", { length: 255 }).notNull().unique(),
	emailVerified: t.boolean("email_verified").notNull(),
	image: t.text("image"),
	createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
	updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});

export const session = pgTable("session", {
	id: t.text("id").primaryKey(),
	userId: t.text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	token: t.varchar("token", { length: 255 }).notNull().unique(),
	expiresAt: t.timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
	ipAddress: t.text("ip_address"),
	userAgent: t.text("user_agent"),
	createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
	updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});


export const account = pgTable("account", {
	id: t.text("id").primaryKey(),
	userId: t.text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	accountId: t.text("account_id").notNull(),
	providerId: t.text("provider_id").notNull(),
	accessToken: t.text("access_token"),
	refreshToken: t.text("refresh_token"),
	accessTokenExpiresAt: t.timestamp("access_token_expires_at", { precision: 6, withTimezone: true }),
	refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at", { precision: 6, withTimezone: true }),
	scope: t.text("scope"),
	idToken: t.text("id_token"),
	password: t.text("password"),
	createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
	updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});

export const verification = pgTable("verification", {
	id: t.text("id").primaryKey(),
	identifier: t.text("identifier").notNull(),
	value: t.text("value").notNull(),
	expiresAt: t.timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
	createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
	updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));