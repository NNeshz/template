import { env } from "@template/api/utils/envs";

/**
 * Tag names for `detail.tags` on routes. Declared in OpenAPI `documentation.tags`
 * for descriptions in Scalar/Swagger.
 */
export const openApiTags = {
  Health: "Health",
} as const;

const envelopeDoc = [
  "## Contrato de respuesta",
  "Todas las rutas JSON propias usan el mismo sobre:",
  "",
  "- **Éxito (2xx):** `{ success: true, status: 200, message: string, data: … }`",
  "- **Error:** `{ success: false, status: number, message: string }`",
  "",
  "Rutas **Owner** requieren sesión Better Auth (cookie). Sin sesión: **401** con el mismo cuerpo de error.",
  "",
  "Los webhooks externos validan firma (Polar Standard Webhooks, Resend/Svix); el cuerpo de éxito sigue el mismo `data` cuando aplica.",
].join("\n");

const backendUrl = env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

/** Passed to `@elysiajs/openapi` `documentation` option. */
export const openApiDocumentation = {
  info: {
    title: "Template API",
    version: "1.0.50",
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
      description: "Comprobación de servicio y base de datos.",
    }
  ],
};