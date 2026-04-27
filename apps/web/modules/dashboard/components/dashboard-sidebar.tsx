"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@repo/ui/components/sidebar";
import { dashboardNavMain } from "@/modules/dashboard/data/dashboard-sidebar-data";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { DashboardSidebarHeader } from "./dashboard-sidebar-header";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <DashboardSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dashboardNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}