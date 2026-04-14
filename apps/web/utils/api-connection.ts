import {
  createApiClient,
  type ApiClient,
} from "@template/api/src/eden";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is required");
}

export const apiClient: ApiClient = createApiClient(baseUrl);
