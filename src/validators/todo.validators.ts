import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  statusId: z.string().uuid("Please select a status"),
});

export type CreateTodoFormData = z.infer<typeof createTodoSchema>;
