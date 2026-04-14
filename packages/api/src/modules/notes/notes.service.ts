import { db, desc, eq, ownerNotes } from "@template/database";

const TITLE_MAX = 120;
const BODY_MAX = 50_000;

export class NotesService {
  listForOwner(ownerId: string) {
    return db
      .select()
      .from(ownerNotes)
      .where(eq(ownerNotes.ownerId, ownerId))
      .orderBy(desc(ownerNotes.createdAt));
  }

  async createForOwner(
    ownerId: string,
    input: { title: string; body?: string | null },
  ) {
    const title = input.title.trim().slice(0, TITLE_MAX);
    if (!title) {
      throw new Error("El título es obligatorio");
    }
    const rawBody = input.body?.trim();
    const body =
      rawBody && rawBody.length > 0
        ? rawBody.slice(0, BODY_MAX)
        : null;

    const [row] = await db
      .insert(ownerNotes)
      .values({
        ownerId,
        title,
        body,
      })
      .returning();

    return row;
  }
}

export const notesService = new NotesService();
