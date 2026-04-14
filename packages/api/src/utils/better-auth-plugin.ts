import { Elysia, status } from "elysia";
import { auth } from "@template/auth";
import { apiError } from "./api-envelope";

export const betterAuthPlugin = new Elysia({ name: "better-auth-plugin" })
  .mount(auth.handler)
  .macro({
    authenticated: {
      async resolve({ request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) {
          return status(401, apiError(401, "No autorizado"));
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
