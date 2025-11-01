import { useDraggable } from "@dnd-kit/core";
import type { TodoWithStatus } from "../../types/todo.types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { GripVertical } from "lucide-react";

interface TaskCardProps {
  task: TodoWithStatus;
  onEdit?: (task: TodoWithStatus) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
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
    <Card
      className={`background ${isDragging ? "opacity-50" : ""} relative`}
      ref={setNodeRef}
      style={style}
      onClick={() => onEdit?.(task)}
    >
      <div
        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        {...listeners}
        {...attributes}
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="size-4 opacity-30" />
      </div>

      <CardHeader className="pl-8">
        <CardTitle className="cursor-pointer">{task.title}</CardTitle>
        <CardDescription className="cursor-pointer">
          {task.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
