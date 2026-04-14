import { apiClient } from "@/utils/api-connection";
import { errorMessageFromUnknown } from "@/utils/normalize-error";
import type {
  OwnerNoteCreateData,
  OwnerNotesListData,
  OwnerNoteRow,
} from "@/modules/notes/types/notes.types";

function toServiceError(value: unknown, fallback: string): Error {
  return new Error(errorMessageFromUnknown(value, fallback));
}

function unwrapEnvelopeData(raw: unknown): unknown {
  if (raw === null || typeof raw !== "object") return raw;
  const o = raw as Record<string, unknown>;
  if (o.success === false && typeof o.message === "string") {
    throw new Error(o.message);
  }
  if ("data" in o) return o.data;
  return raw;
}

function parseNoteRow(value: unknown): OwnerNoteRow {
  if (value === null || typeof value !== "object") {
    throw new Error("Nota inválida");
  }
  const o = value as Record<string, unknown>;
  const id = o.id;
  const ownerId = o.ownerId;
  const title = o.title;
  const body = o.body;
  const createdAt = o.createdAt;
  if (typeof id !== "string" || typeof ownerId !== "string") {
    throw new Error("Nota inválida");
  }
  if (typeof title !== "string") {
    throw new Error("Nota inválida");
  }
  if (body !== null && typeof body !== "string") {
    throw new Error("Nota inválida");
  }
  let created: string;
  if (createdAt instanceof Date) {
    created = createdAt.toISOString();
  } else if (typeof createdAt === "string") {
    created = createdAt;
  } else {
    throw new Error("Nota inválida");
  }
  return {
    id,
    ownerId,
    title,
    body: body as string | null,
    createdAt: created,
  };
}

class NotesService {
  async listOwnerNotes(): Promise<OwnerNoteRow[]> {
    const response = await apiClient.notes.owner.get();

    if (response.error) {
      throw toServiceError(
        response.error.value,
        "No se pudieron cargar las notas",
      );
    }

    const data = unwrapEnvelopeData(response.data) as OwnerNotesListData;
    if (!data || typeof data !== "object" || !Array.isArray(data.notes)) {
      throw new Error("Respuesta inválida del servidor");
    }
    return data.notes.map(parseNoteRow);
  }

  async createOwnerNote(input: {
    title: string;
    body?: string;
  }): Promise<OwnerNoteRow> {
    const response = await apiClient.notes.owner.post({
      title: input.title,
      ...(input.body !== undefined && input.body !== ""
        ? { body: input.body }
        : {}),
    });

    if (response.error) {
      throw toServiceError(response.error.value, "No se pudo crear la nota");
    }

    const unwrapped = unwrapEnvelopeData(response.data) as OwnerNoteCreateData;
    if (
      !unwrapped ||
      typeof unwrapped !== "object" ||
      unwrapped.note === undefined
    ) {
      throw new Error("Respuesta inválida del servidor");
    }
    return parseNoteRow(unwrapped.note);
  }
}

export const notesService = new NotesService();
