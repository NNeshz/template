import { buttonVariants } from "@template/ui/src/components/button";
import { cn } from "@template/ui/src/lib/utils";
import Link from "next/link";
import { IconBrandGithub, IconArrowRight } from "@tabler/icons-react";

const stack = [
  {
    label: "Next.js 15",
    detail: "App Router, RSC, Turbopack.",
  },
  {
    label: "Elysia",
    detail: "Type-safe HTTP with OpenAPI built in.",
  },
  {
    label: "Drizzle ORM",
    detail: "Schema-first SQL with zero overhead.",
  },
  {
    label: "Better Auth",
    detail: "Session cookies, OAuth, zero config.",
  },
  {
    label: "Eden",
    detail: "End-to-end typed client from your API.",
  },
  {
    label: "Supabase Postgres",
    detail: "Managed database, instant provisioning.",
  },
];

const layers = [
  {
    title: "Database",
    path: "packages/database",
    items: [
      "Schema as code — Drizzle tables under src/schema/",
      "Single db client exported for the entire monorepo",
      "Migrations generated and applied locally",
    ],
  },
  {
    title: "API",
    path: "packages/api",
    items: [
      "Domain modules: service → module → schema → routes",
      "Typed envelope responses (apiSuccess / apiError)",
      "Auth plugin with authenticated macro per route",
    ],
  },
  {
    title: "Frontend",
    path: "apps/web",
    items: [
      "Feature modules: types → service → hooks → components",
      "Thin pages that only compose — no direct API calls",
      "Typed Eden client wired once, used everywhere",
    ],
  },
];

export default function Page() {
  return (
    <div className="min-h-dvh w-full">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-sm font-semibold tracking-tight">
            template/
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/NNeshz/template"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <IconBrandGithub className="size-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-32 text-center md:pb-32 md:pt-44">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground" />
            Production-ready monorepo template
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Ship faster.
            <br />
            <span className="text-muted-foreground">Stay structured.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            A full-stack TypeScript template with everything wired — database,
            API, auth, and frontend — so you can focus on building your product
            instead of gluing tools together.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="https://github.com/NNeshz/template"
              target="_blank"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 hover:cursor-pointer",
              )}
            >
              Get started
              <IconArrowRight className="size-4" />
            </Link>
            <Link
              href="https://github.com/NNeshz/template"
              target="_blank"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hover:cursor-pointer",
              )}
            >
              <IconBrandGithub className="size-4" />
              GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stack grid ── */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Built with
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            The modern stack, already wired.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((s) => (
              <div key={s.label} className="bg-background p-6">
                <h3 className="text-sm font-semibold">{s.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture layers ── */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Architecture
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Three layers, one pattern.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every feature follows the same shape — database schema, API module,
            frontend module — so the codebase scales without surprises.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {layers.map((layer) => (
              <div
                key={layer.title}
                className="flex flex-col rounded-xl border p-6"
              >
                <h3 className="text-lg font-semibold">{layer.title}</h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {layer.path}
                </p>
                <ul className="mt-5 flex flex-1 flex-col gap-3">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 block size-1 shrink-0 rounded-full bg-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How a feature flows ── */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Workflow
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            From schema to screen in four steps.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Define",
                text: "Add a Drizzle table under src/schema/ and generate a migration.",
              },
              {
                step: "02",
                title: "Serve",
                text: "Create an API module — service, schema, routes — behind the auth plugin.",
              },
              {
                step: "03",
                title: "Consume",
                text: "Wire a frontend service + hook through the typed Eden client.",
              },
              {
                step: "04",
                title: "Compose",
                text: "Build small components and assemble them in a thin page file.",
              },
            ].map((s) => (
              <div key={s.step} className="bg-background p-6">
                <span className="font-mono text-xs text-muted-foreground">
                  {s.step}
                </span>
                <h3 className="mt-2 text-sm font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center md:py-32">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to build?
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Clone the repo, set your env vars, and start shipping. Everything is
            already connected.
          </p>
          <div className="mt-8">
            <Link
              href="https://github.com/NNeshz/template"
              target="_blank"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 hover:cursor-pointer",
              )}
            >
              Clone template
              <IconArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>template/</span>
          <Link
            href="https://github.com/nneshz"
            target="_blank"
            className="transition-colors hover:text-foreground"
          >
            @nneshz
          </Link>
        </div>
      </footer>
    </div>
  );
}
