import { apiRequest } from "../lib/api-client";
import type {
  CreateStatusInput,
  Status,
  UpdateStatusInput,
} from "../types/status.types";

export const statusService = {
  getAllStatuses: async (): Promise<Status[]> => {
    return apiRequest<Status[]>("/statuses", {
      method: "GET",
    });
  },

  create: async (data: CreateStatusInput): Promise<Status> => {
    return apiRequest<Status>("/statuses", {
      method: "POST",
      body: data,
    });
  },

  update: async (id: string, data: UpdateStatusInput): Promise<Status> => {
    return apiRequest<Status>(`/statuses/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest<void>(`/statuses/${id}`, {
      method: "DELETE",
    });
  },
};
