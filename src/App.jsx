import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/functional/Header";
import TaskForm from "./components/functional/TaskForm";
import TaskList from "./components/functional/TaskList";
import CardWrapper from "./components/functional/CardWrapper";
import ActivityLogger from "./components/class/ActivityLogger";

export default function App() {
  const { theme } = useContext(ThemeContext);

  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [latestAction, setLatestAction] = useState("");

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Update browser tab title
  const pending = tasks.filter((t) => !t.done).length;
  useEffect(() => {
    document.title = `(${pending}) pending tasks`;
  }, [pending]);

  const addTask = useCallback((task) => {
    setTasks((prev) => [task, ...prev]);
    setLatestAction(`Added "${task.title}" #${Date.now()}`);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    setLatestAction(`Toggled a task #${Date.now()}`);
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setLatestAction(`Deleted a task #${Date.now()}`);
  }, []);

  const visibleTasks = useMemo(() => {
    return tasks.filter((t) => {
      const statusOk =
        filter === "all" || (filter === "done" ? t.done : !t.done);
      const priorityOk =
        priorityFilter === "all" || t.priority === priorityFilter;
      return statusOk && priorityOk;
    });
  }, [tasks, filter, priorityFilter]);

  return (
    <div className={`app ${theme}`}>
      <Header pendingCount={pending} />

      <CardWrapper title="Add Task">
        <TaskForm onAddTask={addTask} />
      </CardWrapper>

      <CardWrapper title="Summary">
        <p>
          Total: {tasks.length} | Done: {tasks.length - pending} | Pending:{" "}
          {pending}
        </p>
      </CardWrapper>

      <CardWrapper title="Tasks">
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setLatestAction(`Status filter: ${e.target.value} #${Date.now()}`);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => {
            setPriorityFilter(e.target.value);
            setLatestAction(`Priority filter: ${e.target.value} #${Date.now()}`);
          }}
        >
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </CardWrapper>

      <CardWrapper title="Activity Log">
        <ActivityLogger latestAction={latestAction} />
      </CardWrapper>
    </div>
  );
}