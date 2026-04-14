export function errorMessageFromUnknown(value: unknown, fallback: string): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.message || fallback;
  if (typeof value === "object" && "message" in value) {
    const m = (value as { message?: unknown }).message;
    if (typeof m === "string" && m.length > 0) return m;
  }
  return fallback;
}
