import { t } from "elysia";
import type { TSchema } from "@sinclair/typebox";

/** Standard success body for owner JSON routes (matches `apiSuccessSchema`). */
export function apiSuccess<T>(message: string, data: T) {
  return {
    success: true as const,
    status: 200 as const,
    message,
    data,
  };
}

/** Standard error body (`set.status` must match `status`; matches `apiErrorEnvelopeSchema`). */
export function apiError(status: number, message: string) {
  return {
    success: false as const,
    status,
    message,
  };
}

export type ApiSuccessBody<T> = {
  success: true;
  status: 200;
  message: string;
  data: T;
};

export type ApiErrorBody = {
  success: false;
  status: number;
  message: string;
};

/**
 * TypeBox schema for a success response, wrapping the module's `data` schema.
 * Use in a route's `response` to document + validate the envelope.
 *
 * @example
 * .get("/", () => apiSuccess("ok", data), {
 *   response: { 200: apiSuccessSchema(t.Object({ status: t.String() })) },
 * })
 */
export const apiSuccessSchema = <T extends TSchema>(data: T) =>
  t.Object({
    success: t.Literal(true),
    status: t.Literal(200),
    message: t.String(),
    data,
  });

/** TypeBox schema for an error response (matches `apiError`). */
export const apiErrorSchema = t.Object({
  success: t.Literal(false),
  status: t.Number(),
  message: t.String(),
});