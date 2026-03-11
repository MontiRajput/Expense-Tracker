import { useContext } from "react";
import "./expense.css";
import { GlobalContext } from "../context/globalProvider";

const Expense = ({
  expense,
  token,
  getUser,
}: {
  expense: any;
  token: string;
  getUser: any;
}) => {
  const { setUser, setExpenses } = useContext(GlobalContext) as any;

  const deleteExpense = async (expenseId: string) => {
    await fetch(
      `expense-tracker-six-beta-obi0f5x34v.vercel.app/expenses/${expenseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("Deleted", expenseId);

    // refresh user data after deleting expense
    getUser(setUser, setExpenses);
  };

  return (
    <div className="expense">
      <div className="left">
        <h5>{expense.title}</h5>
        <span className="badge">{expense.category}</span>
      </div>

      <div className="right">
        <h5>${expense.amount}</h5>

        <i
          className="fa-regular fa-trash-can delete-icon"
          onClick={() => deleteExpense(expense.id)}
        ></i>
      </div>
    </div>
  );
};

export default Expense;
