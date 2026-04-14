import { NotesHeader } from "@/modules/notes/components/notes-header";
import { OwnerNotesForm } from "@/modules/notes/components/owner-notes-form";
import { OwnerNotesList } from "@/modules/notes/components/owner-notes-list";

export default function NotesPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <NotesHeader />
      <OwnerNotesForm />
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tus notas</h2>
        <OwnerNotesList />
      </section>
    </div>
  );
}
