export const StoreKeys = {
  AUTH: "auth:user",
  CART: "cart:items",
  SETTINGS: "settings:preferences",
  CART_LEGACY: "cart:data",
} as const;

export type StoreKey = typeof StoreKeys[keyof typeof StoreKeys];