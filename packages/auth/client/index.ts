import { createAuthClient } from "better-auth/react";
import { getSessionCookie } from "better-auth/cookies";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { NextRequest } from "next/server";
import type { auth } from "@template/auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const getSession = async (request: NextRequest) => {
  return await getSessionCookie(request);
};