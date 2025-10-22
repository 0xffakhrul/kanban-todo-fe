import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todo.service";
import type { CreateTodoInput } from "../types/todo.types";
import type { ApiError } from "../lib/api-client";
import { toast } from "react-hot-toast";

export function useTodo() {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todoService.getAllTodos,
    staleTime: 5 * 60 * 1000,
  });

  const createTodoMutation = useMutation({
    mutationFn: (data: CreateTodoInput) => todoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Task created successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to create task");
    },
  });

  return {
    todos,
    isLoading,
    error,
    createTodo: createTodoMutation.mutate,
    isCreating: createTodoMutation.isPending,
    createError: createTodoMutation.error,
  };
}
