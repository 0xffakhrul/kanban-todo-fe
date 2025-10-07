import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import App from "./App";
import Home from "./components/Home";
import Register from "./components/Auth/Register";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

const routeTree = rootRoute.addChildren([homeRoute, registerRoute]);

export const router = new Router({ routeTree });
