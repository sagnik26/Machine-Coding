import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTodo } from "../store/todoSlice";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(setTodo(task));
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="enter task.."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">add task</button>
    </form>
  );
};

export default TodoForm;
