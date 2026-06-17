"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@template/ui/components/sidebar";
import { authClient } from "@template/auth/client";
import { can, type AppRole } from "@template/auth/rbac";
// Side-effect import: registers every module's sidebar entry (auto-generated).
import { getDashboardModules } from "@/modules/dashboard-modules.generated";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { DashboardSidebarHeader } from "./dashboard-sidebar-header";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const role = ((session?.user as { role?: AppRole } | undefined)?.role ?? "employee") as AppRole;

  const items = React.useMemo(
    () =>
      getDashboardModules().filter(
        (item) => !item.permission || can(role, [item.permission]),
      ),
    [role],
  );

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <DashboardSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
