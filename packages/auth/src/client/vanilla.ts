import { createAuthClient as createAuthClientVanilla } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "../utils/auth";

export const authClientVanilla = createAuthClientVanilla({
  // NEXT_PUBLIC_BACKEND_URL must be set — validated at startup by apps/web/utils/env.ts
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});