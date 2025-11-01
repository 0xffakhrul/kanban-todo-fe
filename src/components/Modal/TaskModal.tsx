import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TaskForm from "../Board/TaskForm";
import type { TodoWithStatus } from "../../types/todo.types";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo?: TodoWithStatus;
  initialStatusId?: string;  
}

export default function TaskDialog({ open, onOpenChange, todo, initialStatusId }: TaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {todo ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm 
          todo={todo} 
          initialStatusId={initialStatusId} 
          onSuccess={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}