import {
  createRootRoute,
  createRoute,
  Navigate,
  Router,
  Outlet,
} from "@tanstack/react-router";
import App from "./App";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Board from "./components/Board/Board";
import AuthLayout from "./components/Auth/AuthLayout";
import BoardLayout from "./layouts/BoardLayout";
import { useAuth } from "./hooks/useAuth";

const rootRoute = createRootRoute({
  component: App,
});

const IndexRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated) {
    return <Navigate to="/board" />;
  }
  return <Navigate to="/login" />;
};

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexRedirect,
});

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: () => <Outlet />, 
});

const registerRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/register",
  component: () => (
    <AuthLayout title="Create Account" subtitle="Sign up to get started">
      <Register />
    </AuthLayout>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/login",
  component: () => (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      <Login />
    </AuthLayout>
  ),
});

const boardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "dashboard",
  component: BoardLayout,
});

const boardRoute = createRoute({
  getParentRoute: () => boardLayoutRoute,
  path: "/board",
  component: Board,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authLayoutRoute.addChildren([registerRoute, loginRoute]),
  boardLayoutRoute.addChildren([boardRoute]),
]);

export const router = new Router({ routeTree });
