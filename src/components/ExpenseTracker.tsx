import { useState } from "react";
import { addExpense, editExpense, deleteExpense } from "../store/expenseSlice";
import { useDispatch, useSelector } from "react-redux";

const ExpenseTracker = () => {
  const [expenseItemName, setExpenseItemName] = useState("");
  const [expenseItemPrice, setExpenseItemPrice] = useState("");
  const [expenseItemCategory, setExpenseItemCategory] = useState("");
  const [editItem, setEditItem] = useState({
    name: "",
    price: "",
    category: "",
  });
  const dispatch = useDispatch();
  const { expenses, filterType } = useSelector((item: any) => item.expense);
  const [editId, setEditId] = useState(null);

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

  console.log("EEE");

  return (
    <div>
      <h1>Expense Tracker</h1>

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
      <p>
        Total Expense:{" "}
        {expenses.reduce(
          (acc: Number, curr: { itemPrice: Number }) =>
            Number(acc) + Number(curr.itemPrice),
          0
        )}
      </p>
      <div
        style={{
          marginTop: 20,
        }}
      >
        {expenses.map((item: any) => {
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
                    setEditItem({
                      ...editItem,
                      name: item.itemName,
                      price: item.itemPrice,
                      category: item.category,
                    });
                  } else {
                    dispatch(
                      editExpense({
                        id: item.id,
                        category: editItem.category,
                        itemName: editItem.name,
                        itemPrice: editItem.price,
                      })
                    );
                    setEditId(null);
                    setEditItem({
                      name: "",
                      price: "",
                      category: "",
                    });
                  }
                }}
              >
                {editId && editId === item.id ? "save" : "edit"}
              </button>
              <button onClick={() => dispatch(deleteExpense(item.id))}>
                delete
              </button>
              {editId && editId === item.id && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Name..."
                    value={editItem.name}
                    onChange={(e) =>
                      setEditItem({ ...editItem, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Enter Price..."
                    value={editItem.price}
                    onChange={(e) =>
                      setEditItem({ ...editItem, price: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter Category..."
                    value={editItem.category}
                    onChange={(e) =>
                      setEditItem({ ...editItem, category: e.target.value })
                    }
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
