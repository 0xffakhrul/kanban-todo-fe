import Board from "./components/Board/Board";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";
import { Outlet } from "@tanstack/react-router";

export default function App() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
