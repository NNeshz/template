import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";

export const getSession = async (request: NextRequest) => {
  return await getSessionCookie(request);
};
