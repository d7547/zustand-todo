import localforage from "localforage";

export interface StorageEngine {
  getItem: (name: string) => Promise<any>;
  setItem: (name: string, value: any) => Promise<void>;
  removeItem: (name: string) => Promise<void>;
}

const localforageStorage: StorageEngine = {
  getItem: async (name: string) => {
    try {
      const value = await localforage.getItem(name);
      return value;
    } catch (error) {
      console.error(`[Storage] Failed to get "${name}":`, error);
      return null;
    }
  },

  setItem: async (name: string, value: any) => {
    try {
      await localforage.setItem(name, value);
    } catch (error) {
      console.error(`[Storage] Failed to set "${name}":`, error);
      throw new Error(`Storage failed for key: ${name}`);
    }
  },

  removeItem: async (name: string) => {
    try {
      await localforage.removeItem(name);
    } catch (error) {
      console.error(`[Storage] Failed to remove "${name}":`, error);
    }
  },
};

export default localforageStorage;