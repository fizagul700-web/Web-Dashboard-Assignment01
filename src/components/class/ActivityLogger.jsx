import { Component } from "react";

export default class ActivityLogger extends Component {
  state = { logs: [], toast: "" };
  timer = null;

  // 1) Runs once when the component appears
  componentDidMount() {
    const saved = JSON.parse(localStorage.getItem("activityLogs") || "[]");
    this.setState({ logs: saved });
    window.addEventListener("keydown", this.handleKey);
  }

  // 2) Runs every time props or state change
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.latestAction &&
      this.props.latestAction !== prevProps.latestAction
    ) {
      const entry = `${new Date().toLocaleTimeString()} - ${this.props.latestAction}`;
      this.setState((s) => ({
        logs: [entry, ...s.logs].slice(0, 20),
        toast: entry,
      }));
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.setState({ toast: "" }), 2500);
    }

    if (prevState.logs !== this.state.logs) {
      localStorage.setItem("activityLogs", JSON.stringify(this.state.logs));
    }
  }

  // 3) Runs when the component disappears (cleanup)
  componentWillUnmount() {
    clearTimeout(this.timer);
    window.removeEventListener("keydown", this.handleKey);
  }

  handleKey = (e) => {
    if (e.key === "Escape") this.setState({ toast: "" });
  };

  clearLogs = () => this.setState({ logs: [] });

  render() {
    const { logs, toast } = this.state;
    return (
      <div>
        {toast && <div className="toast">{toast}</div>}
        <button onClick={this.clearLogs}>Clear logs</button>
        {logs.length === 0 ? (
          <p>No activity yet.</p>
        ) : (
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}