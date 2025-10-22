import { create } from "zustand";
import type { TodoState } from "../types/todo.types";

export const useTodoStore = create<TodoState>((set) => ({
  selectedTodoId: null,
  setSelectedTodo: (todoId) => set({ selectedTodoId: todoId }),
}));
