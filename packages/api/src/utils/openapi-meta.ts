import { env } from "./envs";

export const openApiTags = {
  Health: "Health",
  Auth: "Auth",
} as const;

const backendUrl = env.NEXT_PUBLIC_BACKEND?.replace(/\/$/, "");

export const openApiDocumentation = {
  info: {
    title: "API",
    version: "1.0.0",
  },
  ...(backendUrl
    ? {
        servers: [{ url: backendUrl, description: "Backend" }],
      }
    : {}),
  tags: [
    {
      name: openApiTags.Health,
      description: "Service health check.",
    },
    {
      name: openApiTags.Auth,
      description: "Authentication routes (Better Auth).",
    },
  ],
};
