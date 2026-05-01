"use client";

import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@template/ui/components/sidebar";
import { DASHBOARD_SIDEBAR_BRAND_SUBTITLE } from "@/modules/dashboard/lib/dashboard-display";

export function DashboardSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/dashboard">
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-primary p-1.5 text-primary-foreground font-semibold text-sm">
              T
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-sidebar-foreground">Template</span>
              <span className="truncate text-xs text-sidebar-foreground/60">
                {DASHBOARD_SIDEBAR_BRAND_SUBTITLE}
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}