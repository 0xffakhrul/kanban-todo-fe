import type { AuthState } from "../types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      setUser: (user) =>
        set({ user, isAuthenticated: !!user, isInitialized: true }),
      clearUser: () =>
        set({ user: null, isAuthenticated: false, isInitialized: true }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), 
    }
  )
);
