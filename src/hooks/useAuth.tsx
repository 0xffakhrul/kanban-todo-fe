import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth.store";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "../services/auth.service";
import type { LoginInput, RegisterInput } from "../types/auth.types";
import { ApiError } from "../lib/api-client";

export function useAuth() {
  const { user, isAuthenticated, isInitialized, setUser, clearUser } =
    useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const { user } = await authService.getCurrentUser();
        setUser(user);
        return user;
      } catch (error) {
        clearUser();
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && [401, 403].includes(error.status)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (response) => {
      setUser(response.user);
      navigate({ to: "/board" });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (response) => {
      setUser(response.user);
      navigate({ to: "/board" });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      clearUser();
      queryClient.clear();
      navigate({ to: "/login" });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      clearUser();
      queryClient.clear();
      navigate({ to: "/login" });
    },
  });

  return {
    user,
    isAuthenticated: isAuthenticated && isInitialized,
    isLoading: isLoading || !isInitialized,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
  };
}
