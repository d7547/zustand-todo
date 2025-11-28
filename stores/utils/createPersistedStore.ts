import { persist, devtools } from "zustand/middleware";
import { StateCreator } from "zustand";
import localforageStorage, { StorageEngine } from "./storage/localforageStorage";

const STORE_REGISTRY = new Set<string>();

export interface PersistConfig {
  name: string;
  version?: number;
  migrate?: (persistedState: unknown, version: number) => any;
}

export function createPersistedStore<State extends Record<string, any>>(
  stateCreator: StateCreator<State>,
  config: PersistConfig,
  options?: {
    storage?: StorageEngine;
    onError?: (error: Error) => void;
  }
) {
  const { name, version = 1, migrate } = config;
  const storage = options?.storage || localforageStorage;
  const onError = options?.onError;

  // Development: warn about HMR re-registrations
  if (process.env.NODE_ENV === "development") {
    if (STORE_REGISTRY.has(name)) {
      console.warn(
        `[Zustand] Store "${name}" re-registered. This is normal during HMR.`
      );
    } else {
      STORE_REGISTRY.add(name);
    }
  } else {
    if (STORE_REGISTRY.has(name)) {
      throw new Error(`Duplicate Zustand store name detected: "${name}"`);
    }
    STORE_REGISTRY.add(name);
  }

  // Create persisted store with versioning
  const persistedConfig = persist(stateCreator, {
    name,
    version,
    storage,
    migrate: (persistedState: any, persistedVersion: number) => {
      if (migrate && persistedVersion < version) {
        console.log(
          `[Zustand] Migrating store "${name}" from v${persistedVersion} to v${version}`
        );
        return migrate(persistedState, persistedVersion);
      }
      return persistedState;
    },
    onRehydrateStorage: () => (state, error) => {
      if (error) {
        console.error(`[Zustand] Failed to rehydrate "${name}":`, error);
        const err = error instanceof Error ? error : new Error(String(error));
        onError?.(err);
      } else {
        console.log(`[Zustand] Store "${name}" rehydrated successfully`);
      }
    },
  });

  // Wrap with devtools in development
  if (process.env.NODE_ENV === "development") {
    return devtools(persistedConfig, { name });
  }

  return persistedConfig;
}