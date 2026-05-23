const required = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
} as const;

const missing = Object.entries(required)
  .filter(([, v]) => !v?.trim())
  .map(([k]) => k);

if (missing.length > 0) {
  throw new Error(
    `[env] Variables de entorno faltantes: ${missing.join(", ")}`,
  );
}

export const env = required as Record<keyof typeof required, string>;
