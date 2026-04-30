import { BackButton } from "@/modules/auth/components/back-button";
import { SignInButton } from "@/modules/auth/components/sign-in-button";
import { SetupChecklist } from "@/modules/auth/components/setup-checklist";

export default function PageAuth() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="absolute top-6 left-6">
        <BackButton />
      </div>

      <main className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-xl font-semibold">Iniciar sesión</h1>
          <p className="text-sm text-muted-foreground">
            Usa tu cuenta de Google para continuar
          </p>
        </div>

        <SignInButton />

        <SetupChecklist />
      </main>
    </div>
  );
}
