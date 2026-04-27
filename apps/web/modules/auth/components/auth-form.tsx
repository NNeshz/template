"use client";

import Link from "next/link";
import { IconArrowLeft, IconBrandGoogleFilled } from "@tabler/icons-react";
import { Button } from "@repo/ui/components/button";
import { useGoogleSignIn, buildGoogleOAuthCallbackUrl } from "@/modules/auth";
import type { AuthSectionProps } from "@/modules/auth";

export function AuthForm({ callbackNext }: AuthSectionProps) {
  const { mutate: signIn, isPending } = useGoogleSignIn();

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/">
          <IconArrowLeft className="size-4" />
          Volver
        </Link>
      </Button>

      <Button
        size="lg"
        disabled={isPending}
        onClick={() => signIn(buildGoogleOAuthCallbackUrl(callbackNext))}
      >
        <IconBrandGoogleFilled className="size-4" />
        {isPending ? "Redirigiendo…" : "Continuar con Google"}
      </Button>
    </div>
  );
}
