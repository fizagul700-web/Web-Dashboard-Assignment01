import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {
  return tasks.length === 0 ? (
    <p>No tasks found. Add one above! 🎉</p>
  ) : (
    <ul>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}