import Link from "next/link";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <Link href="/dashboard/notes" className="text-sm font-semibold">
          Notas
        </Link>
      </header>
      <main className="mx-auto w-full max-w-3xl p-4">{children}</main>
    </div>
  );
}
