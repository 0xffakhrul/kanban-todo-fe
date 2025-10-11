import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import App from "./App";
import Home from "./components/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Board from "./components/Board/Board";

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

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const boardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/board",
  component: Board
})

const routeTree = rootRoute.addChildren([homeRoute, registerRoute, loginRoute, boardRoute]);

export const router = new Router({ routeTree });
