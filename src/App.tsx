import "./index.css";
import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen overflow-hidden">
        <Toaster />
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
