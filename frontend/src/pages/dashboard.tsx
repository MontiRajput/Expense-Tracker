import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./dashboard.css";
import Dropdown from "../components/dropdown";
import ExpenseList from "../components/expenseList";
import Dialog from "../components/dialog";
import { GlobalContext } from "../context/globalProvider";
import {
  getCurrentMonthSpending,
  getExpenses,
  getUser,
  updateExpensesInRange,
} from "../api/apiCalls";

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
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useContext(GlobalContext) as any;

  const spend = getCurrentMonthSpending(user?.expenses || []);

  useEffect(() => {
    getUser(setUser, setExpenses);
  }, []);

  useEffect(() => {
    if (user) {
      getExpenses(filterCategory, setExpenses, user);
    }
  }, [filterCategory, user]);

  useEffect(() => {
    updateExpensesInRange(startDate, endDate, setExpenses);
  }, [startDate, endDate]);
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
            <input
              type="date"
              className="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <span className="badge badge-custom outline">To</span>
            <input
              type="date"
              className="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
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
