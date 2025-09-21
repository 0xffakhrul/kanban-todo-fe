import "./Board.scss";
import Column from "./Column";

export default function Board() {
  const dummyColumns = [
    { id: 1, title: "TODO" },
    { id: 2, title: "IN PROGRESS" },
    { id: 3, title: "DONE" },
    { id: 3, title: "DONE" },
    { id: 3, title: "DONE" },
    { id: 3, title: "DONE" },
    { id: 3, title: "DONE" },
    { id: 3, title: "DONE" },
  ];
  return (
    <div className="board">
      <div className="board__title">
        <p className="board__title--text">Welcome to the board</p>
      </div>
      <div className="columns-container">
        {dummyColumns.map((col) => (
          <Column key={col.id} title={col.title} />
        ))}
      </div>
    </div>
  );
}
