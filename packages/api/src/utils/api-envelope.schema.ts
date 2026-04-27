import { t, type TSchema } from "elysia";

/**
 * Standard success body: `{ success, status: 200, message, data }`.
 * Use `data: t.Any()` when the payload is large or shared types are awkward for Eden.
 */
export function apiSuccessEnvelopeSchema<T extends TSchema>(dataSchema: T) {
  return t.Object({
    success: t.Literal(true),
    status: t.Literal(200),
    message: t.String(),
    data: dataSchema,
  });
}

/** Success envelope with untyped `data` (common for CRUD owner routes). */
export const apiSuccessAnyDataSchema = apiSuccessEnvelopeSchema(t.Any());

/**
 * Standard error body: `{ success: false, status, message }` (no extra fields).
 * `set.status` must match `status`.
 */
export function apiErrorEnvelopeSchema(statusCode: number) {
  return t.Object({
    success: t.Literal(false),
    status: t.Literal(statusCode),
    message: t.String(),
  });
}

/** Owner list pagination inside `data` (audits, tenants-style lists). */
export const listPaginationMetaSchema = t.Object({
  currentPage: t.Number(),
  totalPages: t.Number(),
  totalItems: t.Number(),
  itemsPerPage: t.Number(),
  hasNextPage: t.Boolean(),
  hasPreviousPage: t.Boolean(),
  nextPage: t.Union([t.Number(), t.Null()]),
  previousPage: t.Union([t.Number(), t.Null()]),
});