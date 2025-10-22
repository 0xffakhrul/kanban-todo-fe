import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { LoginInput } from "../../types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormData,
} from "../../validators/auth.validators";
import { ApiError } from "../../lib/api-client";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const { login, loginError, isLoginLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    login(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {loginError instanceof ApiError ? loginError.message : "Login failed"}
        </div>
      )}

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
        <button type="submit" disabled={isLoginLoading} className="btn2">
          {isLoginLoading ? "Logging in..." : "Login"}
        </button>
      </div>

      <div className="auth-link">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </form>
  );
}
