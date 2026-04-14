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

export function apiSuccess<T>(message: string, data: T): ApiSuccessBody<T> {
  return {
    success: true,
    status: 200,
    message,
    data,
  };
}

export function apiError(status: number, message: string): ApiErrorBody {
  return {
    success: false,
    status,
    message,
  };
}
