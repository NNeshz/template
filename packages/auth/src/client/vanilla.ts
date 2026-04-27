import { createAuthClient as createAuthClientVanilla } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@repo/auth";

export const authClientVanilla = createAuthClientVanilla({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  plugins: [inferAdditionalFields<typeof auth>()],
});
