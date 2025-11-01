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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface TaskFormProps {
  onSuccess?: () => void;
  todo?: TodoWithStatus;
  initialStatusId?: string;
}

export default function TaskForm({
  onSuccess,
  todo,
  initialStatusId,
}: TaskFormProps) {
  const {
    createTodo,
    isCreating,
    createError,
    updateTodo,
    isUpdating,
    updateError,
  } = useTodo();
  const { statuses, isLoading: isLoadingStatuses } = useStatus();

  const isEditMode = !!todo;

  const form = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: todo
      ? {
          title: todo.title,
          description: todo.description || "",
          statusId: todo.statusId,
        }
      : {
          title: "",
          description: "",
          statusId: initialStatusId || "",
        },
  });

  const onSubmit = async (data: CreateTodoFormData) => {
    if (isEditMode) {
      updateTodo(
        { id: todo.id, data },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      createTodo(data, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      });
    }
  };

  const error = createError || updateError;
  const isSubmitting = isCreating || isUpdating;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="text-destructive text-sm p-3 bg-destructive/10 rounded-md">
            {error instanceof ApiError
              ? error.message
              : `Failed to ${isEditMode ? "update" : "create"} task`}
          </div>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter task description..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="statusId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoadingStatuses}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
            ? "Update Task"
            : "Create Task"}
        </Button>
      </form>
    </Form>
  );
}
