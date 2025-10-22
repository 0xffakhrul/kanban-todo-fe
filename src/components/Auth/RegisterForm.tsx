import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import {
  registerSchema,
  type RegisterFormData,
} from "../../validators/auth.validators";
import { useForm } from "react-hook-form";
import type { RegisterInput } from "../../types/auth.types";
import { ApiError } from "../../lib/api-client";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterForm() {
  const {
    register: registerUser,
    registerError,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    registerUser(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {registerError && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {registerError instanceof ApiError
            ? registerError.message
            : "Login failed"}
        </div>
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
