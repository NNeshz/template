import Image from "next/image";
import { Button } from "@repo/ui/components/button";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8">
        <ol className="list-inside list-decimal text-center text-sm/6 font-[family-name:var(--font-geist-mono)] sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Clona el repo y configura tu{" "}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              .env
            </code>
          </li>
          <li className="tracking-[-.01em]">
            Corre <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">bun dev</code> y empieza a construir.
          </li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a href="/auth">Probar Auth</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/nneshz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver repositorio
            </a>
          </Button>
        </div>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          href="https://nneshz.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
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
