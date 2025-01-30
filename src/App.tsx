import { useDispatch } from "react-redux";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { setFilter } from "./store/todoSlice";

function App() {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>Todo App</h1>
        <TodoForm />
        <div
          style={{
            marginTop: 15,
          }}
        >
          <button onClick={() => dispatch(setFilter("all"))}>all</button>
          <button onClick={() => dispatch(setFilter("completed"))}>
            completed
          </button>
          <button onClick={() => dispatch(setFilter("pending"))}>
            pending
          </button>
        </div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
