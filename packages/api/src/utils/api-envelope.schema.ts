import { t, type TSchema } from "elysia";

export function apiSuccessEnvelopeSchema<T extends TSchema>(dataSchema: T) {
  return t.Object({
    success: t.Literal(true),
    status: t.Literal(200),
    message: t.String(),
    data: dataSchema,
  });
}

export const apiSuccessAnyDataSchema = apiSuccessEnvelopeSchema(t.Any());

export function apiErrorEnvelopeSchema(statusCode: number) {
  return t.Object({
    success: t.Literal(false),
    status: t.Literal(statusCode),
    message: t.String(),
  });
}

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
