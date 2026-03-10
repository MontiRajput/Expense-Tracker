import Expense from "./expense";
import "./expenseList.css";
type Props = {
  expenses?: any[];
  token: any;
  getUser: any;
};

const ExpenseList = ({ expenses = [], token, getUser }: Props) => {
  console.log(expenses);
  return (
    <div className="list">
      {expenses?.map((expense) => (
        <Expense
          key={expense.id}
          expense={expense}
          token={token}
          getUser={getUser}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
