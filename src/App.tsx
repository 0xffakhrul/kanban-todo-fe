import Board from "./components/Board/Board";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";

export default function App() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="content">
        <Board />
      </div>
    </div>
  );
}
