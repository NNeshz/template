"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notesService } from "@/modules/notes/service/notes-service";

const OWNER_NOTES_KEY = ["owner-notes"] as const;

export function useOwnerNotesQuery() {
  return useQuery({
    queryKey: OWNER_NOTES_KEY,
    queryFn: () => notesService.listOwnerNotes(),
    staleTime: 1000 * 30,
  });
}

export function useCreateOwnerNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { title: string; body?: string }) =>
      notesService.createOwnerNote(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: OWNER_NOTES_KEY });
    },
  });
}
