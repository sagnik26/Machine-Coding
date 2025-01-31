import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [] as any[],
    filterType: "all",
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push({
        id: Date.now(),
        category: action.payload.category,
        itemName: action.payload.itemName,
        itemPrice: action.payload.itemPrice,
        date: new Date().toISOString().split("T")[0],
      });
    },
    editExpense: (state, action) => {
      const expenseFound = state.expenses.find(
        (item) => item.id === action.payload.id
      );

      if (expenseFound) {
        if (action.payload.category) {
          expenseFound.category = action.payload.category;
        }
        if (action.payload.itemName) {
          expenseFound.itemName = action.payload.itemName;
        }
        if (action.payload.itemPrice) {
          expenseFound.itemPrice = action.payload.itemPrice;
        }
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filterType = action.payload;
    },
  },
});

export const { addExpense, editExpense, deleteExpense, setFilter } =
  expenseSlice.actions;
export default expenseSlice.reducer;
