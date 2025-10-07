import { Link } from "@tanstack/react-router";

export default function LoginForm() {
  return (
    <form action="">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Password</label>
        <input type="password" id="password" />
      </div>

      <div>
        <button type="submit" className="btn2">
          Login
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
