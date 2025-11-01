import { apiRequest } from "../lib/api-client";
import type { CreateTodoInput, TodoWithStatus, UpdateTodoInput } from "../types/todo.types";

export const todoService = {
  getAllTodos: async (): Promise<TodoWithStatus[]> => {
    return apiRequest<TodoWithStatus[]>("/todos", {
      method: "GET",
    });
  },

  create: async (data: CreateTodoInput): Promise<TodoWithStatus> => {
    return apiRequest<TodoWithStatus>("/todos", {
      method: "POST",
      body: data,
    });
  },

  update: async (
    id: string,
    data: UpdateTodoInput
  ): Promise<TodoWithStatus> => {
    return apiRequest<TodoWithStatus>(`/todos/${id}`, {
      method: "PUT",
      body: data,
    });
  },
};
