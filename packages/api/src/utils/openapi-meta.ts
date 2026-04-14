import { env } from "./envs";

export const openApiTags = {
  Health: "Health",
  Notes: "Notes",
} as const;

const envelopeDoc = [
  "## Contrato de respuesta",
  "Todas las rutas JSON propias usan el mismo sobre:",
  "",
  "- **Éxito (2xx):** `{ success: true, status: 200, message: string, data: … }`",
  "- **Error:** `{ success: false, status: number, message: string }`",
  "",
  "Rutas **Owner** requieren sesión Better Auth (cookie). Sin sesión: **401** con el mismo cuerpo de error.",
].join("\n");

const backendUrl = env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

export const openApiDocumentation = {
  info: {
    title: "Template API",
    version: "1.0.0",
    description: envelopeDoc,
  },
  ...(backendUrl
    ? {
        servers: [{ url: backendUrl, description: "Backend (env)" }],
      }
    : {}),
  tags: [
    {
      name: openApiTags.Health,
      description: "Comprobación de servicio.",
    },
    {
      name: openApiTags.Notes,
      description: "Notas del usuario autenticado (ejemplo CRUD mínimo).",
    },
  ],
};
