import React, { useState } from "react";
import { addExpense, editExpense, setFilter } from "../store/expenseSlice";
import { useDispatch, useSelector } from "react-redux";

const ExpenseTracker = () => {
  const [expenseItemName, setExpenseItemName] = useState("");
  const [expenseItemPrice, setExpenseItemPrice] = useState("");
  const [expenseItemCategory, setExpenseItemCategory] = useState("");
  const dispatch = useDispatch();
  const { expenses, filterType } = useSelector((item: any) => item.expense);
  const [editId, setEditId] = useState(null);
  const [date, setDate] = useState("");

  const handleAdd = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      expenseItemName.trim() &&
      expenseItemCategory.trim() &&
      expenseItemPrice
    ) {
      dispatch(
        addExpense({
          category: expenseItemCategory,
          itemName: expenseItemName,
          itemPrice: expenseItemPrice,
        })
      );
      setExpenseItemCategory("");
      setExpenseItemName("");
      setExpenseItemPrice("");
    }
  };

  const filteredExpenses = expenses;

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <h2>Filters</h2>
        <input
          type="text"
          value={date}
          placeholder="enter date..."
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={() => {}}>search</button>
      </div>

      <h2>Add Expense</h2>
      <form onSubmit={handleAdd} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Enter Name..."
          value={expenseItemName}
          onChange={(e) => setExpenseItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Price..."
          value={expenseItemPrice}
          onChange={(e) => setExpenseItemPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Category..."
          value={expenseItemCategory}
          onChange={(e) => setExpenseItemCategory(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Expense List</h2>
      <div
        style={{
          marginTop: 20,
        }}
      >
        {filteredExpenses.map((item: any) => {
          return (
            <div
              style={{
                width: "80%",
                padding: 10,
                marginTop: 5,
                border: "1px solid black",
                height: "auto",
              }}
              key={item.id}
            >
              <button
                onClick={() => {
                  if (!editId) {
                    setEditId(item.id);
                    setExpenseItemName(item.itemName);
                    setExpenseItemPrice(item.itemPrice);
                    setExpenseItemCategory(item.category);
                  } else {
                    dispatch(
                      editExpense({
                        id: item.id,
                        category: expenseItemCategory,
                        itemName: expenseItemName,
                        itemPrice: expenseItemPrice,
                      })
                    );
                    setEditId(null);
                    setExpenseItemCategory("");
                    setExpenseItemName("");
                    setExpenseItemPrice("");
                  }
                }}
              >
                {editId && editId === item.id ? "save" : "edit"}
              </button>
              {editId && editId === item.id && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Name..."
                    value={expenseItemName || item.itemName}
                    onChange={(e) => setExpenseItemName(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Enter Price..."
                    value={expenseItemPrice}
                    onChange={(e) => setExpenseItemPrice(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter Category..."
                    value={expenseItemCategory}
                    onChange={(e) => setExpenseItemCategory(e.target.value)}
                  />
                </div>
              )}
              <p>Category: {item.category}</p>
              <p>Date: {item.date}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ wordBreak: "break-all" }}>{item.itemName}</p>
                <p style={{ wordBreak: "break-all" }}>{item.itemPrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseTracker;
