import { IconHome } from "@tabler/icons-react";
import { registerDashboardModule } from "@/modules/dashboard/data/dashboard-sidebar-data";

/**
 * Base dashboard entry. Discovered by `scripts/gen.ts` like any other module's
 * `dashboard.ts`. No `permission` → always visible.
 */
registerDashboardModule({
  title: "Inicio",
  url: "/dashboard",
  icon: IconHome,
});
