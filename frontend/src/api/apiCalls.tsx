type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
};
const token = localStorage.getItem("token");

export const getUser = async (
  setUser: (user: any) => void,
  setExpenses: (expenses: Expense[]) => void,
) => {
  try {
    const res = await fetch(
      "https://expense-tracker-2-z4xh.onrender.com/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await res.json();
    console.log(setUser);
    setUser(data);
    setExpenses(data.expenses ?? []);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const getCurrentMonthSpending = (expenses: Expense[] = []) => {
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
};

export const getExpenses = async (
  filterCategory: string,
  setExpenses: (expenses: Expense[]) => void,
  user: any,
) => {
  try {
    if (filterCategory === "All Categories") {
      setExpenses(user?.expenses ?? []);
      return;
    }

    const res = await fetch(
      `https://expense-tracker-2-z4xh.onrender.com/expenses?category=${filterCategory}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch expenses");
    }

    const data: Expense[] = await res.json();
    setExpenses(data);
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};

export const updateExpensesInRange = async (
  startDate: string,
  endDate: string,
  setExpenses: (expenses: Expense[]) => void,
) => {
  if (!startDate || !endDate) return;

  try {
    const response = await fetch(
      `https://expense-tracker-2-z4xh.onrender.com/expenses?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch expenses in date range");
    }

    const result: Expense[] = await response.json();

    setExpenses(result);
  } catch (error) {
    console.error("Error fetching date range expenses:", error);
  }
};
