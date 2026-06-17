export type Cliente = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
};

/** Matches the API success envelope (`apiSuccess`) from `@template/api`. */
type ApiSuccess<T> = { success: true; status: 200; message: string; data: T };

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Fetch clientes from the API with a direct, typed `fetch` (no Eden yet).
 * `credentials: "include"` sends the better-auth cookie. Throws an error with a
 * `status` field so callers can branch on 403.
 */
export async function fetchClientes(): Promise<Cliente[]> {
  const res = await fetch(`${BACKEND_URL}/api/clientes`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw Object.assign(new Error("No se pudieron cargar los clientes"), {
      status: res.status,
    });
  }

  const body = (await res.json()) as ApiSuccess<Cliente[]>;
  return body.data;
}
