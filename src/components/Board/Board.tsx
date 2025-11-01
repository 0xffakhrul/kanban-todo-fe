import { useEffect, useState } from "react";
import Column from "./Column";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Button } from "../ui/button";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import { useStatus } from "../../hooks/useStatus";
import { useTodo } from "../../hooks/useTodo";
import { Check, Plus, X } from "lucide-react";
import Modal from "../Modal/Modal";
import TaskForm from "./TaskForm";
import { ModeToggle } from "../mode-toggle";
import { AppSidebar } from "../Navbar/app-sidebar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TaskDialog from "../Modal/TaskModal";
import Nav from "./Navv";
import type { TodoWithStatus } from "@/types/todo.types";
import { Input } from "../ui/input";

export default function Board() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { statuses, isLoading: isLoadingStatuses, createStatus } = useStatus();
  const { todos, isLoading: isLoadingTodos, updateTodo } = useTodo();
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [newStatusName, setNewStatusName] = useState<string>("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TodoWithStatus | undefined>(
    undefined
  );
  const [initialStatusId, setInitialStatusId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleCreateStatus = () => {
    if (newStatusName.trim()) {
      createStatus({ name: newStatusName.trim() });
      setNewStatusName("");
      setIsAddingStatus(false);
    }
  };

  const handleCancelCreate = () => {
    setNewStatusName("");
    setIsAddingStatus(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatusId = over.id as string;

    const task = todos.find((t) => t.id === taskId);
    if (!task || task.statusId === newStatusId) return;

    updateTodo({
      id: taskId,
      data: { statusId: newStatusId },
    });
  };

  const handleEditTask = (task: TodoWithStatus) => {
    setEditingTask(task);
    setInitialStatusId(undefined);
    setIsTaskModalOpen(true);
  };

  const handleAddTaskToColumn = (statusId: string) => {
    setInitialStatusId(statusId);
    setEditingTask(undefined);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(undefined);
    setInitialStatusId(undefined);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between py-4 px-8 border-b shrink-0">
        <div className="board__title">
          <p className="board__title--text font-bold text-2xl">
            Welcome {user?.name || "to the board"}
          </p>
        </div>
        <div className="board__btn-group flex gap-2">
          <div>
            <Button onClick={() => setIsTaskModalOpen(true)}>
              + Add New Task
            </Button>
          </div>

          {isAuthenticated && (
            <div>
              <Button variant={"destructive"} onClick={() => logout()}>
                Logout
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
      {/* Scrollable columns area - ONLY HORIZONTAL */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden min-h-0">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="columns-container px-8 pt-4 flex gap-3 h-full min-w-min">
            {isLoadingStatuses || isLoadingTodos ? (
              <p>Loading...</p>
            ) : statuses.length === 0 ? (
              <p>No statuses found</p>
            ) : (
              statuses.map((status) => (
                <Column
                  key={status.id}
                  id={status.id}
                  title={status.name}
                  tasks={todos.filter((todo) => todo.statusId === status.id)}
                  onEditTask={handleEditTask}
                  onAddTask={handleAddTaskToColumn}
                />
              ))
            )}
            <div className="add-status-container">
              {isAddingStatus ? (
                <div className="add-status-form">
                  <Input
                    type="text"
                    value={newStatusName}
                    onChange={(e) => setNewStatusName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreateStatus();
                      if (e.key === "Escape") handleCancelCreate();
                    }}
                    placeholder="Status name . . ."
                    className="transparent-input"
                    autoFocus
                  />
                  <div className="space-x-2 pt-2">
                    <Button
                      onClick={handleCreateStatus}
                      disabled={!newStatusName.trim()}
                    >
                      <Check />
                    </Button>
                    <Button onClick={handleCancelCreate}>
                      <X />
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  className="add-status-btn"
                  onClick={() => setIsAddingStatus(true)}
                >
                  <span>+ Add Column . . .</span>
                </button>
              )}
            </div>
          </div>
        </DndContext>
      </div>
      <TaskDialog
        open={isTaskModalOpen}
        onOpenChange={handleCloseModal}
        todo={editingTask}
        initialStatusId={initialStatusId}
      />
    </div>
  );
}
