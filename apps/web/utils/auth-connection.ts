import { authService } from "@/modules/auth/service/auth-service";

export async function signInWithGoogle(callbackURL?: string) {
  return authService.signInWithGoogle(callbackURL);
}