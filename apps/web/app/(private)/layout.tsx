import { auth } from "@template/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/modules/auth/components/sign-out-button";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <Link href="/dashboard/notes" className="text-sm font-semibold">
          Notas
        </Link>
        <SignOutButton />
      </header>
      <main className="mx-auto w-full max-w-3xl p-4">{children}</main>
    </div>
  );
}
