export type OwnerNoteRow = {
  id: string;
  ownerId: string;
  title: string;
  body: string | null;
  createdAt: string;
};

export type OwnerNotesListData = {
  notes: OwnerNoteRow[];
};

export type OwnerNoteCreateData = {
  note: OwnerNoteRow;
};
