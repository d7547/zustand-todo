export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token:string;
  login:(email:string,  password:string) =>void;
  setUser: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// src/stores/auth/auth.migrations.ts
export const authMigrations = {
  0: (state: any) => {
    // v0 -> v1: Add avatar field if missing
    if (state.user && !state.user.avatar) {
      state.user.avatar = undefined;
    }
    return state;
  },
};