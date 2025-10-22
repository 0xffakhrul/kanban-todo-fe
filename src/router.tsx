import {
  createRootRoute,
  createRoute,
  Navigate,
  Router,
} from "@tanstack/react-router";
import App from "./App";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Board from "./components/Board/Board";
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

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const boardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/board",
  component: Board,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  registerRoute,
  loginRoute,
  boardRoute,
]);

export const router = new Router({ routeTree });
