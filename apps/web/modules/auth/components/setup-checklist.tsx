import { IconDatabase, IconBrandGoogle } from "@tabler/icons-react";
import type { ReactNode } from "react";

const steps: { icon: React.ElementType; label: ReactNode }[] = [
  {
    icon: IconDatabase,
    label: (
      <>
        Ejecuta{" "}
        <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
          bun db:migrate
        </code>{" "}
        en el paquete de base de datos
      </>
    ),
  },
  {
    icon: IconBrandGoogle,
    label: (
      <>
        Configura{" "}
        <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
          GOOGLE_CLIENT_ID
        </code>{" "}
        y{" "}
        <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
          GOOGLE_CLIENT_SECRET
        </code>{" "}
        en tu{" "}
        <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
          .env
        </code>
      </>
    ),
  },
];

export function SetupChecklist() {
  return (
    <ol className="flex flex-col gap-3 text-sm/6 font-[family-name:var(--font-geist-mono)]">
      {steps.map(({ icon: Icon, label }, i) => (
        <li key={i} className="flex items-start gap-2 tracking-[-.01em]">
          <Icon className="mt-0.5 size-4 shrink-0 opacity-60" />
          <span>{label}</span>
        </li>
      ))}
    </ol>
  );
}
