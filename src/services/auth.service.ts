import { apiRequest } from "../lib/api-client";
import type { AuthResponse, RegisterInput } from "../types/auth.types";

export const authService = {
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: data,
    });
  },
};
