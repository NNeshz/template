"use client";

import { authClient } from "@template/auth/client/index";
import { Button } from "@template/ui/src/components/button";

export function SignInGoogle() {
  return (
    <Button
      type="button"
      onClick={() =>
        void authClient.signIn.social({
          provider: "google",
          callbackURL: "/dashboard/notes",
        })
      }
    >
      Continuar con Google
    </Button>
  );
}
