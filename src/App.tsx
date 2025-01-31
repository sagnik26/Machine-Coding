import "./App.css";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <ExpenseTracker />
    </div>
  );
}

export default App;
