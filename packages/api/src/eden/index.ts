import { treaty } from "@elysiajs/eden";
import type { Treaty } from "@elysiajs/eden";
import type { Api } from "../index";

/** Subárbol bajo el prefijo `/api` del app Elysia (p. ej. `notes.owner.get`). */
export type ApiClient = Treaty.Create<Api> extends { api: infer A }
  ? A
  : Treaty.Create<Api>;

export type { Api };

export function createApiClient(baseUrl: string): ApiClient {
  const instance = treaty<Api>(baseUrl, {
    fetch: { credentials: "include" },
  });
  return ("api" in instance ? instance.api : instance) as ApiClient;
}
