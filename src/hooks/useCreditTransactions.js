import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export function useCreditTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("credit-transactions");
    if (data) setTransactions(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "credit-transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  function addTransaction(tx) {
    setTransactions((prev) => [...prev, { ...tx, id: uuid() }]);
  }

  return { transactions, addTransaction };
}