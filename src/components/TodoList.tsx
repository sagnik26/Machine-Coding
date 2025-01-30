import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, completeTodo, editTodo } from "../store/todoSlice";
import { useState } from "react";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((item: any) => item.todo.todos);
  const filter = useSelector((item: any) => item.todo.filterType);
  const [editId, setEditId] = useState(null);
  const [task, setTask] = useState("");
  const filteredTodos = todos?.filter((item: any) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return item.completed;
    } else if (filter === "pending") {
      return !item.completed;
    } else {
      return true;
    }
  });

  if (filteredTodos.length > 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
          flexWrap: "wrap",
          width: "100%",
          marginTop: 20,
        }}
      >
        {filteredTodos?.map((item: any) => {
          return (
            <div
              key={item.id}
              style={{
                width: "150px",
                minHeight: "120px",
                border: "2px solid black",
                padding: 15,
              }}
            >
              <span
                style={{
                  backgroundColor: item.completed ? "green" : "red",
                  color: "white",
                  padding: 5,
                }}
              >
                {item.completed ? "completed" : "pending"}
              </span>
              <p style={{ wordWrap: "break-word" }}>{item.task}</p>
              <div>
                <button onClick={() => dispatch(completeTodo(item.id))}>
                  toggle
                </button>
                <button onClick={() => dispatch(deleteTodo(item.id))}>
                  delete
                </button>
                {editId === item.id ? (
                  <button
                    onClick={() => {
                      dispatch(
                        editTodo({
                          id: item.id,
                          text: task,
                        })
                      );
                      setEditId(null);
                      setTask("");
                    }}
                  >
                    save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(item.id);
                      setTask(item.task);
                    }}
                  >
                    edit
                  </button>
                )}
              </div>
              {editId === item.id && (
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h2
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No Data Found!
        </h2>
      </div>
    );
  }
};

export default TodoList;
