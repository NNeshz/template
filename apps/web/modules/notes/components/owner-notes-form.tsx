"use client";

import { useState } from "react";
import { Button } from "@template/ui/src/components/button";
import { useCreateOwnerNoteMutation } from "@/modules/notes/hooks/use-owner-notes";

export function OwnerNotesForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const mutation = useCreateOwnerNoteMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t || mutation.isPending) return;
    mutation.mutate(
      { title: t, body: body.trim() || undefined },
      {
        onSuccess: () => {
          setTitle("");
          setBody("");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
    >
      <div className="space-y-2">
        <label htmlFor="note-title" className="text-sm font-medium">
          Título
        </label>
        <input
          id="note-title"
          name="title"
          maxLength={120}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Ej. Llamar al fontanero"
          autoComplete="off"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
        <p className="text-xs text-muted-foreground">
          Máximo 120 caracteres ({title.length}/120)
        </p>
      </div>
      <div className="space-y-2">
        <label htmlFor="note-body" className="text-sm font-medium">
          Detalle (opcional)
        </label>
        <textarea
          id="note-body"
          name="body"
          value={body}
          onChange={(ev) => setBody(ev.target.value)}
          placeholder="Contexto adicional…"
          rows={4}
          className="flex min-h-[100px] w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>
      {mutation.isError ? (
        <p className="text-sm text-destructive" role="alert">
          {mutation.error instanceof Error
            ? mutation.error.message
            : "No se pudo guardar"}
        </p>
      ) : null}
      <Button type="submit" disabled={!title.trim() || mutation.isPending}>
        {mutation.isPending ? "Guardando…" : "Guardar nota"}
      </Button>
    </form>
  );
}
