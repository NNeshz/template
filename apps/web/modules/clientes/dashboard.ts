import { IconUsers } from "@tabler/icons-react";
import { registerDashboardModule } from "@/modules/dashboard/data/dashboard-sidebar-data";

/** Sidebar entry for the clientes module. Gated by RBAC via `permission`. */
registerDashboardModule({
  title: "Clientes",
  url: "/dashboard/clientes",
  icon: IconUsers,
  permission: "clientes.view",
});
