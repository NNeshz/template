import { IconCircleCheckFilled, IconCircleDashed } from "@tabler/icons-react";

interface CheckItem {
  label: string;
  description: string;
}

const items: CheckItem[] = [
  {
    label: "Migraciones de base de datos",
    description: "Ejecuta las migraciones para aplicar el esquema.",
  },
  {
    label: "Credenciales de Google OAuth",
    description: "Agrega las credenciales de Google en el .env",
  },
];

export function SetupChecklist() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-sm">
      <p className="mb-3 font-medium text-card-foreground">
        Antes de continuar:
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            <IconCircleCheckFilled
              size={16}
              className="shrink-0 text-primary"
            />
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
