import type { Api as server } from "@template/api/index";
import { treaty } from "@elysiajs/eden";

export const createApiClient: (
  url: string,
) => ReturnType<typeof treaty<server>>["api"] = (url) =>
  treaty<server>(url, {
    fetch: {
      credentials: "include",
    },
  }).api;
