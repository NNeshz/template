import { IconCircleCheckFilled, IconCircleDashed } from "@tabler/icons-react";

interface CheckItem {
  label: string;
  description: string;
  done: boolean;
}

const items: CheckItem[] = [
  {
    label: "Migraciones de base de datos",
    description: "Ejecuta `bun db:migrate` para aplicar el esquema.",
    done: false,
  },
  {
    label: "Credenciales de Google OAuth",
    description:
      "Agrega GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en tu archivo .env",
    done: false,
  },
];

export function SetupChecklist() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-sm">
      <p className="mb-3 font-medium text-card-foreground">
        Antes de continuar
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            {item.done ? (
              <IconCircleCheckFilled
                size={18}
                className="mt-0.5 shrink-0 text-primary"
              />
            ) : (
              <IconCircleDashed
                size={18}
                className="mt-0.5 shrink-0 text-muted-foreground"
              />
            )}
            <div>
              <p className="font-medium text-foreground">{item.label}</p>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
