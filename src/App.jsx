import { useEffect, useState } from "react";
import Card from "./components/Card";
import Form from "./components/Form";
import List from "./components/List";
import FinanceChart from "./components/FinanceChart";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const data = localStorage.getItem("finance-dashboard");
    if (data) setTransactions(JSON.parse(data).transactions || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("finance-dashboard", JSON.stringify({ transactions }));
  }, [transactions]);

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === "income") acc.income += t.amount;
      else acc.expense += t.amount;
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );

  function addTransaction(tx) {
    setTransactions((prev) => [...prev, tx]);
  }

  function removeTransaction(index) {
    setTransactions((prev) => prev.filter((_, i) => i !== index));
  }

  const filteredTransactions = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-2">Dashboard Financeiro</h1>
          <p className="text-zinc-400">Controle simples e visual das suas finanças</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10">
          <div className="flex flex-row gap-6">
            <Card title="Entradas" value={totals.income} />
            <Card title="Saídas" value={totals.expense} />
            <Card title="Saldo" value={totals.balance} />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10">
          <FinanceChart income={totals.income} expense={totals.expense} />
        </div>

        <Form onAdd={addTransaction} />

        <div className="flex gap-3 mb-4">
          <button onClick={() => setFilter("all")} className={`px-4 py-1 rounded-full text-sm ${filter === "all" ? "bg-white text-black" : "bg-white/10 text-white"}`}>Todas</button>
          <button onClick={() => setFilter("income")} className={`px-4 py-1 rounded-full text-sm ${filter === "income" ? "bg-green-600 text-white" : "bg-white/10 text-white"}`}>Entradas</button>
          <button onClick={() => setFilter("expense")} className={`px-4 py-1 rounded-full text-sm ${filter === "expense" ? "bg-red-600 text-white" : "bg-white/10 text-white"}`}>Saídas</button>
        </div>

        <List items={filteredTransactions} onRemove={removeTransaction} />
      </div>
    </div>
  );
}