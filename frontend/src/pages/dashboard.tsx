import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./dashboard.css";
import Dropdown from "../components/dropdown";
import ExpenseList from "../components/expenseList";
import Dialog from "../components/dialog";
import { GlobalContext } from "../context/globalProvider";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  const {
    user,
    setUser,
    filterCategory,
    setFilterCategory,
    expenses,
    setExpenses,
  } = useContext(GlobalContext) as any;

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
      setExpenses(data.expenses || []);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getExpenses = async () => {
    if (!user) return;

    try {
      if (filterCategory === "All Categories") {
        setExpenses(user.expenses || []);
        return;
      }

      const res = await fetch(
        `http://localhost:3000/expenses?category=${filterCategory}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      setExpenses(data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  function getCurrentMonthSpending(expenses: any[] = []) {
    const now = new Date();

    return expenses.reduce((total, expense) => {
      const date = new Date(expense.createdAt);

      if (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        return total + Number(expense.amount);
      }

      return total;
    }, 0);
  }

  const spend = getCurrentMonthSpending(expenses);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getExpenses();
    }
  }, [filterCategory, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="box1">
        <h3>Summary</h3>

        <div className="spending">
          <p>This Month's Spending</p>
          <h3>${spend}</h3>
        </div>
      </div>

      <div className="box2">
        <div className="header">
          <h5>Expenses</h5>
          <Dialog token={token} getUser={getUser} />
        </div>

        <div className="filters">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="badge badge-custom outline">Category</span>
            <Dropdown value={filterCategory} setValue={setFilterCategory} />
          </div>

          <div>
            <span className="badge badge-custom outline">From</span>
            <input type="date" className="date" />
          </div>

          <div>
            <span className="badge badge-custom outline">To</span>
            <input type="date" className="date" />
          </div>
        </div>

        <div className="expenses">
          <ExpenseList expenses={expenses} token={token} getUser={getUser} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
