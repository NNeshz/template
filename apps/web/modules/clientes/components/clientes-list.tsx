"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@template/ui/components/skeleton";
import { fetchClientes } from "../service/clientes-service";

export function ClientesList() {
  const { data, isPending, error } = useQuery({
    queryKey: ["clientes"],
    queryFn: fetchClientes,
    retry: false,
  });

  if (isPending) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    const status = (error as { status?: number }).status;
    const message =
      status === 403
        ? "No tenés permiso para ver los clientes."
        : "Ocurrió un error al cargar los clientes.";
    return <p className="text-sm text-destructive">{message}</p>;
  }

  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No hay clientes todavía.</p>;
  }

  return (
    <div className="rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-b text-left text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Nombre</th>
            <th className="px-4 py-2 font-medium">Email</th>
            <th className="px-4 py-2 font-medium">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cliente) => (
            <tr key={cliente.id} className="border-b last:border-0">
              <td className="px-4 py-2">{cliente.name}</td>
              <td className="px-4 py-2">{cliente.email}</td>
              <td className="px-4 py-2">{cliente.phone ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
