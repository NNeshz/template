import { Type as t } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const envSchema = t.Object({
  NODE_ENV: t.Union([t.Literal("development"), t.Literal("production")], {
    default: "development",
  }),
  DATABASE_URL: t.String(),
  BETTER_AUTH_SECRET: t.String(),
  BETTER_AUTH_URL: t.String(),
  NEXT_PUBLIC_BACKEND: t.String(),
  NEXT_PUBLIC_FRONTEND: t.String(),
  GOOGLE_CLIENT_ID: t.String(),
  GOOGLE_CLIENT_SECRET: t.String(),
});

const processEnv = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV || "development",
};

const validateEnv = () => {
  if (!Value.Check(envSchema, processEnv)) {
    const errors = Value.Errors(envSchema, processEnv);
    for (const error of errors) {
      console.error(`❌ Variable inválida: ${error.path} — ${error.message}`);
    }
    throw new Error("Configuración de entorno inválida.");
  }
};

validateEnv();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      DATABASE_URL: string;
      BETTER_AUTH_SECRET: string;
      BETTER_AUTH_URL: string;
      NEXT_PUBLIC_BACKEND: string;
      NEXT_PUBLIC_FRONTEND: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export const env = Value.Cast(envSchema, processEnv);