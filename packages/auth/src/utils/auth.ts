import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, admin } from "better-auth/plugins";

import { db, user, session, account, verification } from "@template/database";
import { ac, roles } from "./rbac";

const isProduction = process.env.NODE_ENV === "production";

const trustedOrigins = [
  process.env.NEXT_PUBLIC_FRONTEND_URL,
  process.env.NEXT_PUBLIC_FRONTEND_WWW,
  process.env.NEXT_PUBLIC_BACKEND_URL,
].filter(Boolean) as string[];

export const auth = betterAuth({
  appName: "template",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins,
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ["email", "profile", "openid"],
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: isProduction,
      // In production, set COOKIE_DOMAIN=".yourdomain.com" (include the leading dot)
      domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
    },
  },
  plugins: [
    admin({ ac, roles, defaultRole: "employee" }),
    openAPI(),
  ],
});
