import { useEffect, useState } from "react";
import "./Board.scss";
import Column from "./Column";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Button from "../Button/Button";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import { useStatus } from "../../hooks/useStatus";
import { useTodo } from "../../hooks/useTodo";
import { Check, Plus, X } from "lucide-react";
import Modal from "../Modal/Modal";
import TaskForm from "./TaskForm";

export default function Board() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { statuses, isLoading: isLoadingStatuses, createStatus } = useStatus();
  const { todos, isLoading: isLoadingTodos } = useTodo();
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [newStatusName, setNewStatusName] = useState<string>("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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

    // Find the task being dragged
    const task = todos.find((t) => t.id === taskId);
    if (!task || task.statusId === newStatusId) return;

  };

  return (
    <div className="board-container">
      <Navbar />
      <div className="board">
        <div className="board__top">
          <div className="board__title">
            <p className="board__title--text">
              Welcome {user?.name || "to the board"}
            </p>
          </div>
          <Button
            text="+ Add New Task"
            variant="primary"
            onClick={() => setIsTaskModalOpen(true)}
          />

          {isAuthenticated && (
            <div>
              <button type="button" onClick={() => logout()} className="btn2">
                Logout
              </button>
            </div>
          )}
        </div>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="columns-container">
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
                />
              ))
            )}
            <div className="add-status-container">
              {isAddingStatus ? (
                <div className="add-status-form">
                  <input
                    type="text"
                    value={newStatusName}
                    onChange={(e) => setNewStatusName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreateStatus();
                      if (e.key === "Escape") handleCancelCreate();
                    }}
                    placeholder="Status name..."
                    autoFocus
                  />
                  <button
                    onClick={handleCreateStatus}
                    disabled={!newStatusName.trim()}
                  >
                    <Check size={20} />
                  </button>
                  <button onClick={handleCancelCreate}>
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <button
                  className="add-status-btn"
                  onClick={() => setIsAddingStatus(true)}
                >
                  <Plus />
                  <span>Add Column</span>
                </button>
              )}
            </div>
          </div>
        </DndContext>
      </div>

      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm onSuccess={() => setIsTaskModalOpen(false)} />
      </Modal>
    </div>
  );
}
