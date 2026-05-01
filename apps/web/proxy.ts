import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { authClient } from "@template/auth/client/index";

const PUBLIC_ROUTES = ["/auth"];
const PRIVATE_ROUTES = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isPublicRoute && !isPrivateRoute) {
    return NextResponse.next();
  }

  const { data: session } = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
