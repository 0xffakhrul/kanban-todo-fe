import { apiRequest } from "../lib/api-client";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
  User,
} from "../types/auth.types";

export const authService = {
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: data,
    });
  },

  login: async (data: LoginInput): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: data,
    });
  },

  logout: async (): Promise<void> => {
    return apiRequest<void>("/auth/logout", {
      method: "POST",
    });
  },

  getCurrentUser: async (): Promise<{ user: User }> => {
    return apiRequest<{ user: User }>("/auth/me", {
      method: "GET",
    });
  },
};
