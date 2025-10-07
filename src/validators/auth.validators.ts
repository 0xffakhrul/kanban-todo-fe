import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email!"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2).max(100),
});

export const loginSchema = z.object({
  email: z.email("Invalid email!"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
