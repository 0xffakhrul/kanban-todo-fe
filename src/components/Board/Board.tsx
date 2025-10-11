import { useState } from "react";
import "./Board.scss";
import Column from "./Column";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Button from "../Button/Button";
import Navbar from "../Navbar/Navbar";

interface Task {
  id: string;
  title: string;
  columnId: string;
}

export default function Board() {
  const [columns] = useState([
    { id: "todo", title: "TODO" },
    { id: "in-progress", title: "IN PROGRESS" },
    { id: "done", title: "DONE" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Task 1", columnId: "todo" },
    { id: "2", title: "Task 2", columnId: "in-progress" },
    { id: "3", title: "Task 3", columnId: "done" },
    { id: "4", title: "Task 4", columnId: "todo" },
    { id: "5", title: "Task 5", columnId: "todo" },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      )
    );
  };

  return (
  <>

      <Navbar/>

    <div className="board">
      <div className="board__top">
        <div className="board__title">
          <p className="board__title--text">Welcome to the board</p>
        </div>
        <Button text="+ Add New Task" variant="primary" />
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="columns-container">
          {columns.map((col) => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={tasks.filter((task) => task.columnId === col.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
    </>
  );
}
