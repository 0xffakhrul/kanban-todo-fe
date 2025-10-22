import "./TaskCard.scss";
import { useDraggable } from "@dnd-kit/core";
import type { TodoWithStatus } from "../../types/todo.types";

interface TaskCardProps {
  task: TodoWithStatus;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className={`card ${isDragging ? "card--dragging" : ""}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <p className="card__title">{task.title}</p>
      {task.description && (
        <p className="card__description">{task.description}</p>
      )}
    </div>
  );
}
