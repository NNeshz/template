import { Elysia } from "elysia";
import { betterAuthPlugin } from "../../../utils/better-auth-plugin";
import { notesModule } from "../notes.module";
import {
  createOwnerNoteBodySchema,
  noteCreateSuccessSchema,
  notesListSuccessSchema,
  notesServerErrorSchema,
} from "../notes.schema";
import { apiSuccess, apiError } from "../../../utils/api-envelope";
import { openApiTags } from "../../../utils/openapi-meta";

function mapNotesRouteError(
  e: unknown,
  set: { status?: number | string },
) {
  const message =
    e instanceof Error ? e.message : "Error al procesar la nota";
  set.status = 500;
  return apiError(500, message);
}

export const ownerNotesRoutes = new Elysia({
  name: "ownerNotesRoutes",
  prefix: "/notes/owner",
})
  .use(betterAuthPlugin)
  .use(notesModule)
  .get(
    "/",
    async ({ user, notesService, set }) => {
      try {
        const notes = await notesService.listForOwner(user.id);
        return apiSuccess("Notas obtenidas correctamente", { notes });
      } catch (e) {
        return mapNotesRouteError(e, set);
      }
    },
    {
      authenticated: true,
      response: {
        200: notesListSuccessSchema,
        500: notesServerErrorSchema,
      },
      detail: {
        summary: "Listar notas",
        description: "Notas del usuario autenticado (más recientes primero).",
        tags: [openApiTags.Notes],
      },
    },
  )
  .post(
    "/",
    async ({ user, body, notesService, set }) => {
      try {
        const note = await notesService.createForOwner(user.id, {
          title: body.title,
          body: body.body,
        });
        if (!note) {
          set.status = 500;
          return apiError(500, "No se pudo crear la nota");
        }
        return apiSuccess("Nota creada correctamente", { note });
      } catch (e) {
        return mapNotesRouteError(e, set);
      }
    },
    {
      authenticated: true,
      body: createOwnerNoteBodySchema,
      response: {
        200: noteCreateSuccessSchema,
        500: notesServerErrorSchema,
      },
      detail: {
        summary: "Crear nota",
        description: "Título obligatorio (máx. 120); cuerpo opcional.",
        tags: [openApiTags.Notes],
      },
    },
  );
