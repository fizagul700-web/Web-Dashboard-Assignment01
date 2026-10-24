import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Header({ pendingCount }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <h1>Task Dashboard</h1>
      <span>{pendingCount} pending</span>
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}