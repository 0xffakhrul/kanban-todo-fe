import type { TodoWithStatus } from "../../types/todo.types";
import "./Column.scss";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  id: string;
  title: string;
  tasks: TodoWithStatus[];
}

export default function Column({ id, title, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="column" ref={setNodeRef}>
      <p className="column__title">
        {title} ({tasks.length})
      </p>
      <div className="column__cards">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
