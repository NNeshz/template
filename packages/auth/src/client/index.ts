import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "../utils/auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  plugins: [inferAdditionalFields<typeof auth>()],
});