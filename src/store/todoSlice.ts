import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [] as any[],
    filterType: "all",
  },
  reducers: {
    setTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        task: action.payload,
        completed: false,
      });
    },
    completeTodo: (state, action) => {
      const foundTask = state.todos.find(
        (item: any) => item.id === action.payload
      );

      if (foundTask) {
        foundTask.completed = !foundTask.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const foundTask = state.todos.find((item: any) => item.id === id);
      if (foundTask) {
        foundTask.task = text;
      }
    },
    setFilter: (state, action) => {
      state.filterType = action.payload;
    },
  },
});

export const { setTodo, completeTodo, deleteTodo, editTodo, setFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
