import { createAccessControl } from "better-auth/plugins/access";

/**
 * Define resources and their allowed actions here.
 * When adding a new module to the app, add its resource + actions here
 * and assign permissions to the relevant roles below.
 */
const statement = {
  users:    ["view", "create", "update", "delete"],
  settings: ["view", "update"],
} as const;

export const ac = createAccessControl(statement);

const owner = ac.newRole({
  users:    ["view", "create", "update", "delete"],
  settings: ["view", "update"],
});

const admin = ac.newRole({
  users:    ["view", "create", "update", "delete"],
  settings: ["view", "update"],
});

const manager = ac.newRole({
  users:    ["view", "create", "update"],
  settings: ["view"],
});

const employee = ac.newRole({
  users: ["view"],
});

export const roles = { owner, admin, manager, employee } as const;

export type AppRole = keyof typeof roles;

type Statement = typeof statement;
type Permissions = { [K in keyof Statement]?: Array<Statement[K][number]> };

/**
 * Check if a role has all the given permissions.
 *
 * @example
 * can("admin", { users: ["create"] }) // true
 * can("employee", { users: ["delete"] }) // false
 */
export function can(role: AppRole, permissions: Permissions): boolean {
  const authorize = roles[role].authorize as (p: Permissions) => { success: boolean };
  return authorize(permissions).success;
}
