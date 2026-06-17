import { ClientesList } from "@/modules/clientes";

export default function ClientesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Clientes</h1>
      <ClientesList />
    </div>
  );
}
