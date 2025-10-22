import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { statusService } from "../services/status.service";
import type {
  CreateStatusInput,
  UpdateStatusInput,
} from "../types/status.types";
import type { ApiError } from "../lib/api-client";
import toast from "react-hot-toast";

export function useStatus() {
  const queryClient = useQueryClient();

  const {
    data: statuses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: statusService.getAllStatuses,
    staleTime: 5 * 60 * 1000,
  });

  const createStatusMutation = useMutation({
    mutationFn: (data: CreateStatusInput) => statusService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
    onError: (error: ApiError) => {
      if (error.status === 409) {
        toast.error("A status with same name already exists");
      } else {
        toast.error("Failed to create status");
      }
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStatusInput }) =>
      statusService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
  });

  const deleteStatusMutation = useMutation({
    mutationFn: (id: string) => statusService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
  });

  return {
    statuses,
    isLoading,
    error,
    createStatus: createStatusMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    deleteStatus: deleteStatusMutation.mutate,
    isCreating: createStatusMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
    isDeleting: deleteStatusMutation.isPending,
    createError: createStatusMutation.error,
    updateError: updateStatusMutation.error,
    deleteError: deleteStatusMutation.error,
  };
}
