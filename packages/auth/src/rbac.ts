/**
 * Client-safe RBAC entrypoint.
 *
 * The main `@template/auth` entry re-exports the server `auth` instance (which
 * imports the database). The frontend only needs the pure access-control logic,
 * so it imports from `@template/auth/rbac` instead.
 */
export * from "./utils/rbac";
