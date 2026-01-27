import { useState, useEffect } from "react";

export function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("finance-dashboard");
    return saved ? JSON.parse(saved).transactions : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "finance-dashboard",
      JSON.stringify({ transactions })
    );
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const removeTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const balance = income - expense;

  return { transactions, addTransaction, removeTransaction, income, expense, balance };
}