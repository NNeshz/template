import type { ComponentType } from "react";
import type { AppPermission } from "@template/auth/rbac";

export type DashboardNavIcon = ComponentType<{ className?: string }>;

export type DashboardNavMainItem = {
  title: string;
  url: string;
  icon: DashboardNavIcon;
  isActive?: boolean;
  items?: { title: string; url: string }[];
  /** RBAC gate: the item is hidden unless the current role has this permission. */
  permission?: AppPermission;
};

export type DashboardNavSecondaryItem = {
  title: string;
  url: string;
  icon: DashboardNavIcon;
};