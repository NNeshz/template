import { Type as t } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const envSchema = t.Object({
  NODE_ENV: t.Union(
    [
      t.Literal("development"),
      t.Literal("production"),
      t.Literal("test"),
    ],
    {
      default: "development",
    },
  ),
  AUTH_SECRET: t.String(),
  DATABASE_URL: t.String(),
  NEXT_PUBLIC_BACKEND_URL: t.String(),
  NEXT_PUBLIC_FRONTEND_URL: t.String(),
  GOOGLE_CLIENT_ID: t.String(),
  GOOGLE_CLIENT_SECRET: t.String(),
});

const processEnv = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV || "development",
};
// Valida las variables de entorno
const validateEnv = () => {
  if (!Value.Check(envSchema, processEnv)) {
    const errors = Value.Errors(envSchema, processEnv);
    for (const error of errors) {
      console.error(
        `❌ Variable inválida: ${error.path}, Detalles: ${error.message}`,
      );
    }
    throw new Error("Configuración de entorno inválida.");
  }
};

// Ejecuta la validación
validateEnv();

export const env = Value.Cast(envSchema, processEnv);