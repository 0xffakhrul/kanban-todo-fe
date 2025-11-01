import type { TodoWithStatus } from "../../types/todo.types";
import { Button } from "../ui/button";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  id: string;
  title: string;
  tasks: TodoWithStatus[];
  onEditTask?: (task: TodoWithStatus) => void;
  onAddTask?: (statusId: string) => void;
}

export default function Column({
  id,
  title,
  tasks,
  onEditTask,
  onAddTask,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="w-72" ref={setNodeRef}>
      <p className="pb-4">
        {title} ({tasks.length})
      </p>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}
      </div>
      <Button
        variant={"ghost"}
        className="w-full opacity-50 mt-4"
        onClick={() => onAddTask?.(id)}
      >
        + Add Task
      </Button>
    </div>
  );
}
