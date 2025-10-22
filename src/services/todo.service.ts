import { apiRequest } from "../lib/api-client";
import type { CreateTodoInput, TodoWithStatus } from "../types/todo.types";

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
};
