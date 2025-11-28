import { create } from "zustand";
import { StateCreator } from "zustand";
import { createPersistedStore } from "../utils/createPersistedStore";
import { AuthState, User } from "./auth.types";
import { authMigrations } from "./auth.migrations";
import { StoreKeys } from "../storeKeys";
import { apiInstance } from "@/api";
import { ACTION_RESPONSES } from "@/api/utils";
import { API_ENDPOINTS } from "./endpoints";



const authStateCreator: StateCreator<AuthState> = (set) => ({
  user: null,
  isAuthenticated: false,
  token:'',
  login: async (email: string, password: string) => { 
    try {
        const response = await  apiInstance.call(
          API_ENDPOINTS.login,
          { email, password }
        );
        switch (response.status) {
          case 200:
          case 201:
          case 204:
            console.log("Login successful:", response.data);
            set(() => ({ token: response.data.access }));
            return response.data;
          case 400:
            throw {
              ...ACTION_RESPONSES.failure,
              code: response.status,
              data: response.data,
              error: response.data,
            };
          case 401:
            throw {
              ...ACTION_RESPONSES.failure,
              code: response.status,
              data: response.data,
              error: "Your sessionExpire Please login again",
            };
          case 500:
            throw {
              ...ACTION_RESPONSES.failure,
              error:
                "Oops! Something went wrong on our end. Please try again later. If the issue persists, contact support.",
              code: response.status,
            };
          default:
            throw {
              ...ACTION_RESPONSES.failure,
              code: response.status,
              data: response.data,
              error: response.data,
            };
        }
      } catch (error:any) {
        console.error("Error in getGetFeatured:", error);
        throw error;
      }
  },
  setUser: (user: User) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  updateUser: (updates: Partial<User>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
});

export const useAuthStore = create<AuthState>()(
  createPersistedStore(
    authStateCreator,
    {
      name: StoreKeys.AUTH,
      version: 1,
      migrate: (state: any, version: number) => {
        if (version < 1) {
          return authMigrations[0](state);
        }
        return state;
      },
    },
    {
      // Persist only plain, cloneable data — exclude functions/actions
      partialize: (s) => ({
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        token: s.token,
      }),
    }
  ) as any
);