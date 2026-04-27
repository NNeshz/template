"use client";

import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";

export function DashboardSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/dashboard">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
              T
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Template</span>
              <span className="truncate text-xs">Dashboard</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
