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
    localStorage.setItem(
      "finance-dashboard",
      JSON.stringify({ transactions })
    );
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Dashboard Financeiro
          </h1>
          <p className="text-zinc-400">
            Controle simples e visual das suas finanças
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Entradas" value={totals.income} />
          <Card title="Saídas" value={totals.expense} />
          <Card title="Saldo" value={totals.balance} />
        </div>

        {/* GRÁFICO */}
        <div className="bg-white/10 backdrop-blur border border-white/10 rounded-3xl p-4 sm:p-6">
          <FinanceChart
            income={totals.income}
            expense={totals.expense}
          />
        </div>

        {/* FORM */}
        <Form onAdd={addTransaction} />

        {/* FILTROS */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1 rounded-full text-sm transition ${
              filter === "all"
                ? "bg-white text-black"
                : "bg-white/10 text-white"
            }`}
          >
            Todas
          </button>

          <button
            onClick={() => setFilter("income")}
            className={`px-4 py-1 rounded-full text-sm transition ${
              filter === "income"
                ? "bg-green-600 text-white"
                : "bg-white/10 text-white"
            }`}
          >
            Entradas
          </button>

          <button
            onClick={() => setFilter("expense")}
            className={`px-4 py-1 rounded-full text-sm transition ${
              filter === "expense"
                ? "bg-red-600 text-white"
                : "bg-white/10 text-white"
            }`}
          >
            Saídas
          </button>
        </div>

        {/* LISTA */}
        <List items={filteredTransactions} onRemove={removeTransaction} />

      </div>
    </div>
  );
}