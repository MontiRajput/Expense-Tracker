import { createContext, useState, type ReactNode } from "react";

type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
};

type GlobalContextType = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;

  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

  title: string | null;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;

  amount: number | null;
  setAmount: React.Dispatch<React.SetStateAction<number | null>>;

  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;

  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;

  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;

  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>("Category");
  const [title, setTitle] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        open,
        setOpen,
        category,
        setCategory,
        title,
        setTitle,
        amount,
        setAmount,
        filterCategory,
        setFilterCategory,
        expenses,
        setExpenses,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
