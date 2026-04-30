import { useMutation } from "@tanstack/react-query";
import { authService } from "@/modules/auth/service/auth-service";

/**
 * OAuth es envío explícito → `useMutation`. Sin Zustand: no hay filtros de UI instantáneos.
 */
export function useGoogleSignIn() {
  return useMutation({
    mutationFn: (callbackUrl: string) =>
      authService.signInWithGoogle(callbackUrl),
  });
}