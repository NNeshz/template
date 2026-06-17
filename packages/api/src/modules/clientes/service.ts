import { db, clientes, desc } from "@template/database";

export type CreateClienteInput = {
  name: string;
  email: string;
  phone?: string;
};

/** List clientes, newest first. */
export function listClientes() {
  return db.select().from(clientes).orderBy(desc(clientes.createdAt));
}

/** Create a cliente and return the inserted row. */
export async function createCliente(input: CreateClienteInput) {
  const [created] = await db
    .insert(clientes)
    .values({
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
    })
    .returning();

  return created;
}
