import "./App.scss";
import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="main-container">
      <Toaster />
      {/* <Navbar /> */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
