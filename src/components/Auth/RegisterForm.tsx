import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  registerSchema,
  type RegisterFormData,
} from "../../validators/auth.validators";
import { useForm } from "react-hook-form";
import type { RegisterInput } from "../../types/auth.types";
import { authService } from "../../services/auth.service";
import { ApiError } from "../../lib/api-client";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");
      await authService.register(data);

      navigate({ to: "/" });
    } catch (error) {
      if (error instanceof ApiError) {
        setServerError(error.message);
      } else {
        setServerError("An unexpected error occurred");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{serverError}</div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name && (
          <span
            style={{ color: "red", fontSize: "0.875rem", display: "block" }}
          >
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && (
          <span
            style={{ color: "red", fontSize: "0.875rem", display: "block" }}
          >
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && (
          <span
            style={{ color: "red", fontSize: "0.875rem", display: "block" }}
          >
            {errors.password.message}
          </span>
        )}
      </div>

      <div>
        <button type="submit" disabled={isSubmitting} className="btn2">
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </div>

      <div className="auth-link">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
}
