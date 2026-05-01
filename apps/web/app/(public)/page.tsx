import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@template/ui/components/button";

export const metadata: Metadata = {
  title: "Inicio | Template",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <main className="flex flex-col items-center gap-6 text-center">
        <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li>
            Clona y prepara el{" "}
            <code className="font-mono font-semibold">.env</code>
          </li>
          <li>
            Corre el proyecto con{" "}
            <code className="font-mono font-semibold">bun dev</code> en la raíz
          </li>
        </ol>

        <div className="flex items-center gap-3">
          <Button asChild>
            <a href="/auth">Probar Auth</a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/nneshz/template"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver repositorio
            </a>
          </Button>
        </div>
      </main>

      <footer className="absolute bottom-8 flex items-center gap-2 text-sm text-muted-foreground">
        <a
          href="https://nneshz.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          nneshz.xyz
        </a>
      </footer>
    </div>
  );
}
