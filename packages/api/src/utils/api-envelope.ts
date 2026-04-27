/** Standard success body for owner JSON routes (matches `apiSuccessEnvelopeSchema`). */
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