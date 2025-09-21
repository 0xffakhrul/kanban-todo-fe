import "./Column.scss";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface Task {
  id: string;
  title: string;
  columnId: string;
}

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export default function Column({ id, title, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="column" ref={setNodeRef}>
      <p>{title}</p>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
