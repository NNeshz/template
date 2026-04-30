"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@template/ui/components/sidebar";

export function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="animate-pulse bg-background data-[state=open]:bg-background data-[state=open]:text-sidebar-accent-foreground"
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}