"use client";

import { useOwnerNotesQuery } from "@/modules/notes/hooks/use-owner-notes";
import { Button } from "@template/ui/src/components/button";
import type { OwnerNoteRow } from "@/modules/notes/types/notes.types";

function formatCreatedAt(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function NoteCard({ note }: { note: OwnerNoteRow }) {
  return (
    <li className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="font-semibold leading-tight">{note.title}</h2>
        <time
          className="shrink-0 text-xs text-muted-foreground"
          dateTime={note.createdAt}
        >
          {formatCreatedAt(note.createdAt)}
        </time>
      </div>
      {note.body ? (
        <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
          {note.body}
        </p>
      ) : null}
    </li>
  );
}

export function OwnerNotesList() {
  const { data, isPending, error, isRefetching, refetch } = useOwnerNotesQuery();

  if (isPending) {
    return (
      <div className="space-y-3" aria-busy="true">
        <div className="h-24 animate-pulse rounded-lg bg-muted" />
        <div className="h-24 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm"
        role="alert"
      >
        <p className="font-medium text-destructive">
          {error instanceof Error ? error.message : "Error al cargar notas"}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => void refetch()}
          disabled={isRefetching}
        >
          {isRefetching ? "Reintentando…" : "Reintentar"}
        </Button>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Aún no hay notas. Crea la primera arriba.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3" role="list">
      {data.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ul>
  );
}
