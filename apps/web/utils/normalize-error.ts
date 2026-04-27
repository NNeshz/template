/** Mensaje legible desde errores de Eden u objetos `{ message }`. */
export function errorMessageFromUnknown(
  value: unknown,
  fallback: string,
): string {
  if (value instanceof Error) return value.message;
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "object" && value !== null && "message" in value) {
    const m = (value as { message: unknown }).message;
    if (typeof m === "string" && m.trim()) return m;
  }
  return fallback;
}