import { authClient } from "@template/auth/client";
import { errorMessageFromUnknown } from "@/utils/normalize-error";

function getFrontendBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_FRONTEND;
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error("Falta NEXT_PUBLIC_FRONTEND");
  }
  return raw.replace(/\/$/, "");
}

/**
 * Evita open-redirect: solo rutas relativas al mismo sitio (`/ruta`).
 */
export function sanitizeAuthNextPath(next?: string): string {
  if (!next?.startsWith("/") || next.startsWith("//")) {
    return "/dashboard";
  }
  return next;
}

export function buildGoogleOAuthCallbackUrl(next?: string): string {
  const base = getFrontendBaseUrl();
  const path = sanitizeAuthNextPath(next);
  return `${base}${path}`;
}

class AuthService {
  async signInWithGoogle(callbackURL?: string): Promise<unknown> {
    const url =
      callbackURL?.trim() || `${getFrontendBaseUrl()}/dashboard`;

    const response = await authClient.signIn.social({
      provider: "google",
      callbackURL: url,
    });

    if (response.error) {
      throw new Error(
        errorMessageFromUnknown(
          response.error,
          "No se pudo iniciar sesión con Google",
        ),
      );
    }

    return response.data;
  }
}

export const authService = new AuthService();