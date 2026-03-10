import { useContext } from "react";
import { GlobalContext } from "../context/globalProvider";
import Button from "./button";
import "./dialog.css";
import Dropdown from "./dropdown";

const Dialog = ({ token, getUser }: any) => {
  const {
    setOpen,
    open,
    amount,
    setAmount,
    category,
    setCategory,
    title,
    setTitle,
  } = useContext(GlobalContext) as any;

  const addExpense = async ({ title, amount, finalCategory }: any) => {
    try {
      const res = await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: `${title}`,
          amount: amount,
          category: finalCategory,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add expense");
      }

      console.log("Expense added:", data);
      getUser();
      return data;
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory = category == "Category" ? "Food" : category;

    // console.log(category);

    await addExpense({
      title,
      amount,
      finalCategory,
    });

    setOpen(false);
  };

  return (
    <>
      <Button
        value="+ Add Expense"
        isStyle={true}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Expense Name"
                required
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="number"
                placeholder="Amount"
                required
                onChange={(e) => setAmount(Number(e.target.value))}
              />

              <Dropdown value={category} setValue={setCategory} />

              <Button value="Add" type="submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
