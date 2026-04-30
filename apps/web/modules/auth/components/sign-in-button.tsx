"use client";

import { useState } from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@template/ui/components/button";
import { authService } from "@/modules/auth/service/auth-service";

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    try {
      await authService.signInWithGoogle();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleSignIn} disabled={loading} className="w-full gap-2">
      <IconBrandGoogle size={18} />
      {loading ? "Redirigiendo..." : "Continuar con Google"}
    </Button>
  );
}
