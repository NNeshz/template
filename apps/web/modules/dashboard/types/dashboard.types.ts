import type { ComponentType } from "react";

export type DashboardNavIcon = ComponentType<{ className?: string }>;

export type DashboardNavMainItem = {
  title: string;
  url: string;
  icon: DashboardNavIcon;
  isActive?: boolean;
  items?: { title: string; url: string }[];
};
