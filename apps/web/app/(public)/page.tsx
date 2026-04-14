import { buttonVariants } from "@template/ui/src/components/button";
import { cn } from "@template/ui/src/lib/utils";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";

export default function Page() {
  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center space-y-4 p-8">
      <h1 className="text-center text-6xl font-bold">
        NextJS + Elysia + Supabase
      </h1>
      <p className="max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
        Un template que combina todo lo moderno de{" "}
        <span className="font-semibold text-primary">
          NextJS, Elysia y Supabase
        </span>{" "}
        más la calidad de desarrollo con un plus de Typescript.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="https://github.com/NNeshz/template"
          target="_blank"
          className={cn(
            buttonVariants({
              variant: "outline",
              className: "hover:cursor-pointer",
            }),
          )}
        >
          <IconBrandGithub />
          Repositorio
        </Link>
      </div>
    </div>
  );
}
