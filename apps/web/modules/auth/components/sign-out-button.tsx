"use client";

import { authClient } from "@template/auth/client/index";
import { Button } from "@template/ui/src/components/button";

export function SignOutButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => void authClient.signOut({ fetchOptions: { credentials: "include" } })}
    >
      Cerrar sesión
    </Button>
  );
}
