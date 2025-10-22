import { useForm } from "react-hook-form";
import { useStatus } from "../../hooks/useStatus";
import { useTodo } from "../../hooks/useTodo";
import type { CreateTodoInput, TodoWithStatus } from "../../types/todo.types";
import {
  createTodoSchema,
  type CreateTodoFormData,
} from "../../validators/todo.validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "../../lib/api-client";

interface TaskForm {
  onSuccess?: () => void;
  todo?: TodoWithStatus;
}

export default function TaskForm({ onSuccess, todo }: TaskForm) {
  const { createTodo, isCreating, createError } = useTodo();
  const { statuses, isLoading: isLoadingStatuses } = useStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: todo
      ? {
          title: todo.title,
          description: todo.description || "",
          statusId: todo.statusId,
        }
      : undefined,
  });

  const onSubmit = async (data: CreateTodoFormData) => {
    createTodo(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  const isSubmitting = isCreating;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {createError && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {createError instanceof ApiError
            ? createError.message
            : "Failed to save task"}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          placeholder="Enter task title..."
          {...register("title")}
        />
        {errors.title && (
          <span
            style={{ color: "red", fontSize: "0.875rem", display: "block" }}
          >
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          placeholder="Enter task description..."
          {...register("description")}
        />
        {errors.description && (
          <span
            style={{ color: "red", fontSize: "0.875rem", display: "block" }}
          >
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="statusId">Status *</label>
        <select
          id="statusId"
          {...register("statusId")}
          disabled={isLoadingStatuses}
        >
          <option value="">Select a status...</option>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
        {errors.statusId && (
          <span
            style={{ color: "red", fontSize: "0.875rem", display: "block" }}
          >
            {errors.statusId.message}
          </span>
        )}
      </div>

      <div>
        <button type="submit" disabled={isSubmitting} className="btn2">
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  );
}
