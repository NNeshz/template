import { t } from "elysia";
import {
  apiSuccessEnvelopeSchema,
  apiErrorEnvelopeSchema,
} from "../../utils/api-envelope.schema";

export const createOwnerNoteBodySchema = t.Object({
  title: t.String({ minLength: 1, maxLength: 120 }),
  body: t.Optional(t.String()),
});

const noteRowSchema = t.Object({
  id: t.String(),
  ownerId: t.String(),
  title: t.String(),
  body: t.Union([t.String(), t.Null()]),
  createdAt: t.Union([t.String(), t.Date()]),
});

const notesListDataSchema = t.Object({
  notes: t.Array(noteRowSchema),
});

const noteCreateDataSchema = t.Object({
  note: noteRowSchema,
});

export const notesListSuccessSchema =
  apiSuccessEnvelopeSchema(notesListDataSchema);

export const noteCreateSuccessSchema =
  apiSuccessEnvelopeSchema(noteCreateDataSchema);

export const notesServerErrorSchema = apiErrorEnvelopeSchema(500);
