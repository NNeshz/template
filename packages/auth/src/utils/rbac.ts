import { createAccessControl } from "better-auth/plugins/access";

/**
 * RBAC for the app.
 *
 * Design tradeoff (see README "Cómo agregar un módulo nuevo"):
 * better-auth bakes `ac`/`roles` at import time, and this file lives in
 * `@template/auth` which cannot import from `@template/api` (that would be a
 * circular dependency). That makes true runtime `registerModulePermissions()`
 * impossible *without* losing the compile-time autocomplete that
 * `authorized([...])` relies on. The pragmatic, strongly-typed choice is:
 *
 *   - A new module adds exactly ONE line to `moduleStatements` below.
 *   - Roles are COMPOSED from the statement via policy, so you NEVER edit the
 *     individual roles when adding a module.
 */

/** Base resources present in every install. */
const baseStatement = {
  users: ["view", "create", "update", "delete"],
  settings: ["view", "update"],
} as const;

/**
 * Module resources. A new module adds exactly ONE line here, e.g.:
 *   productos: ["view", "create", "update", "delete"],
 *
 * This is the ONLY RBAC edit a new module needs — roles below pick it up
 * automatically through `modulePolicy`.
 */
const moduleStatements = {
  clientes: ["view", "create", "update", "delete"],
} as const;

export const statement = {
  ...baseStatement,
  ...moduleStatements,
} as const;

export const ac = createAccessControl(statement);

type Statement = typeof statement;
type Resource = keyof Statement & string;
type ActionOf<R extends Resource> = Statement[R][number] & string;

/**
 * Dotted permission union, e.g. `"clientes.view"`.
 * This is what powers autocomplete in `authorized([...])` and `can(...)`.
 */
export type AppPermission = {
  [R in Resource]: `${R}.${ActionOf<R>}`;
}[Resource];

/** App roles. */
export const ROLES = ["owner", "admin", "manager", "employee"] as const;
export type AppRole = (typeof ROLES)[number];

/**
 * Per-role policy applied automatically to every MODULE resource.
 * Adding a module grants access according to this policy without touching
 * any role definition.
 *
 *   - owner / admin: full access to every module.
 *   - manager:       everything except `delete`.
 *   - employee:      no module access by default (must be granted per module).
 */
const modulePolicy: Record<AppRole, (action: string) => boolean> = {
  owner: () => true,
  admin: () => true,
  manager: (action) => action !== "delete",
  employee: () => false,
};

/** Explicit grants for the BASE resources (`users`, `settings`) per role. */
const baseGrants: Record<
  AppRole,
  { [R in keyof typeof baseStatement]?: ReadonlyArray<ActionOf<R & Resource>> }
> = {
  owner: { users: ["view", "create", "update", "delete"], settings: ["view", "update"] },
  admin: { users: ["view", "create", "update", "delete"], settings: ["view", "update"] },
  manager: { users: ["view", "create", "update"], settings: ["view"] },
  employee: { users: ["view"] },
};

type PermissionObject = { [R in Resource]?: ActionOf<R>[] };

/** Compose a role's full permission object from base grants + module policy. */
function buildRolePermissions(role: AppRole): PermissionObject {
  const perms: Record<string, string[]> = {};

  // Base resources: explicit grants.
  for (const [resource, actions] of Object.entries(baseGrants[role])) {
    if (actions) perms[resource] = [...actions];
  }

  // Module resources: policy-driven, so new modules need no role edits.
  for (const resource of Object.keys(moduleStatements) as (keyof typeof moduleStatements)[]) {
    perms[resource] = (moduleStatements[resource] as readonly string[]).filter(
      modulePolicy[role],
    );
  }

  return perms as PermissionObject;
}

// `newRole` expects exact (non-optional) readonly tuples; our composed object is
// structurally valid at runtime but built dynamically, so we cast to its param type.
type NewRoleArg = Parameters<typeof ac.newRole>[0];

const owner = ac.newRole(buildRolePermissions("owner") as NewRoleArg);
const admin = ac.newRole(buildRolePermissions("admin") as NewRoleArg);
const manager = ac.newRole(buildRolePermissions("manager") as NewRoleArg);
const employee = ac.newRole(buildRolePermissions("employee") as NewRoleArg);

export const roles = { owner, admin, manager, employee } as const satisfies Record<
  AppRole,
  unknown
>;

/** Convert `["clientes.view", "clientes.create"]` -> `{ clientes: ["view", "create"] }`. */
function toPermissionObject(permissions: AppPermission[]): PermissionObject {
  const out: Record<string, string[]> = {};
  for (const permission of permissions) {
    const dot = permission.indexOf(".");
    const resource = permission.slice(0, dot);
    const action = permission.slice(dot + 1);
    (out[resource] ??= []).push(action);
  }
  return out as PermissionObject;
}

/**
 * Check whether a role has ALL of the given permissions.
 *
 * @example
 * can("admin", ["clientes.create"]);   // true
 * can("employee", ["clientes.view"]);  // false
 */
export function can(role: AppRole, permissions: AppPermission[]): boolean {
  const authorize = roles[role].authorize as (p: PermissionObject) => { success: boolean };
  return authorize(toPermissionObject(permissions)).success;
}
