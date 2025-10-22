import type { Status } from "./status.types";

export interface Todo {
  id: string;
  title: string;
  description: string;
  statusId: string;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface TodoWithStatus extends Todo {
  status: Status;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  statusId: string;
}

export interface TodoState {
    selectedTodoId: string | null;
    setSelectedTodo: (todoId: string | null) => void;
}
