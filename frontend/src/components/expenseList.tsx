import Expense from "./expense";
import "./expenseList.css";
type Props = {
  expenses?: any[];
  token: any;
  getUser: any;
};

const ExpenseList = ({ expenses = [], token, getUser }: Props) => {
  return (
    <div className="list">
      {expenses.length == 0 ? (
        <h3 style={{ color: "rgba(250,250,250,0.67)" }}>
          Add your First Expense.
        </h3>
      ) : (
        expenses?.map((expense) => (
          <Expense
            key={expense.id}
            expense={expense}
            token={token}
            getUser={getUser}
          />
        ))
      )}
    </div>
  );
};

export default ExpenseList;
