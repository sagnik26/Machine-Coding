import "./App.css";
import CountdownTimer from "./components/CountdownTimer";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <CountdownTimer />
    </div>
  );
}

export default App;
