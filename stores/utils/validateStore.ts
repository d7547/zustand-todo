export type SchemaType = "string" | "number" | "boolean" | "object" | "array";

export interface StoreSchema {
  [key: string]: SchemaType;
}

export function validateStore<T extends Record<string, any>>(
  state: unknown,
  schema: StoreSchema,
  storeName: string
): T {
  if (!state || typeof state !== "object") {
    console.warn(`[Validation] "${storeName}" has invalid state, returning defaults`);
    return {} as T;
  }

  const errors: string[] = [];

  for (const [key, expectedType] of Object.entries(schema)) {
    const value = (state as any)[key];
    const actualType = Array.isArray(value) ? "array" : typeof value;

    if (actualType !== expectedType && actualType !== "undefined") {
      errors.push(`${key}: expected ${expectedType}, got ${actualType}`);
    }
  }

  if (errors.length > 0) {
    console.warn(
      `[Validation] "${storeName}" schema mismatch:\n${errors.join("\n")}`
    );
  }

  return state as T;
}