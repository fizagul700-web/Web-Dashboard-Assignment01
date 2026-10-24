import { memo } from "react";

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <li className={`task ${task.priority}`}>
      <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
        {task.title}
      </span>

      {task.priority === "high" && <strong> 🔥 Urgent</strong>}

      <button onClick={() => onToggle(task.id)}>
        {task.done ? "Undo" : "Done"}
      </button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default memo(TaskCard);