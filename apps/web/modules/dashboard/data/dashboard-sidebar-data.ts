import type { DashboardNavMainItem } from "@/modules/dashboard/types/dashboard.types";

/**
 * Dashboard sidebar registry.
 *
 * Each front module registers its own entry (import-side-effect) from a
 * `modules/<name>/dashboard.ts` file by calling `registerDashboardModule`.
 * `scripts/gen.ts` wires those side-effects into
 * `apps/web/modules/dashboard-modules.generated.ts`, so adding a module never
 * touches this file or the sidebar component.
 *
 * Entries are de-duped by `url` so the registration is safe to run on both the
 * server and client bundles.
 */
const registry = new Map<string, DashboardNavMainItem>();

export function registerDashboardModule(item: DashboardNavMainItem): void {
  registry.set(item.url, item);
}

/** All registered sidebar entries (RBAC filtering happens in the sidebar). */
export function getDashboardModules(): DashboardNavMainItem[] {
  return Array.from(registry.values());
}
