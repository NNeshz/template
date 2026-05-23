import { Elysia, status } from "elysia";
import { auth } from "@template/auth";
import { can, type AppRole } from "@template/auth";
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

    authorized(permissions: Parameters<typeof can>[1]) {
      return {
        async resolve({ request: { headers } }) {
          const session = await auth.api.getSession({ headers });

          if (!session) {
            return status(401, apiError(401, "No autorizado"));
          }

          const role = ((session.user as { role?: AppRole }).role) ?? "employee";

          if (!can(role, permissions)) {
            return status(403, apiError(403, "Prohibido"));
          }

          return {
            user: session.user,
            session: session.session,
          };
        },
      };
    },
  });
