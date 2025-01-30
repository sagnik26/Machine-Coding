import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>Quiz App</h1>
        <Quiz />
      </div>
    </div>
  );
}

export default App;
