import Button from "./button";
import "./expense.css";
const Expense = ({
  expense,
  token,
  getUser,
}: {
  expense: any;
  token: any;
  getUser: any;
}) => {
  const deleteExpense = async (expenseId: string) => {
    await fetch(`http://localhost:3000/expenses/${expenseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Deleted", expenseId);
    getUser();
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
