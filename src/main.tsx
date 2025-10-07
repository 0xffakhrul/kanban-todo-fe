import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
