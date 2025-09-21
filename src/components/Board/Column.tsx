import "./Column.scss";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
}

export default function Column({ title }: ColumnProps) {
  return (
    <div className="column">
      <p>{title}</p>
      <TaskCard />
    </div>
  );
}
