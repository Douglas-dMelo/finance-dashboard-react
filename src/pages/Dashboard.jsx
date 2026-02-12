import { useEffect, useState } from "react";

// Componentes gerais
import Header from "@/components/Header";
import Card from "@/components/Card";
import Form from "@/components/Form";
import List from "@/components/List";
import FinanceChart from "@/components/FinanceChart";

// Crédito
import CreditSection from "@/components/credit/CreditSection";
import { CreditProvider } from "@/components/credit/CreditContext";

export default function Dashboard() {
  // ✅ CONTROLE DO TEMA AQUI
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  // ---------------------

  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const data = localStorage.getItem(`finance-${user?.email}`)
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
    <CreditProvider>
      <div
        className="min-h-screen p-4 sm:p-6
        bg-gradient-to-br 
        from-zinc-100 via-zinc-200 to-white
        dark:from-zinc-900 dark:via-zinc-800 dark:to-black
        transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto space-y-10">
        <Header />
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-2">
                Dashboard Financeiro
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Controle simples e visual das suas finanças
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl text-sm font-medium
              bg-zinc-900 text-white
              dark:bg-white dark:text-black
              transition-all"
            >
              {theme === "dark" ? "☀️ Claro" : "🌙 Escuro"}
            </button>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Entradas" value={totals.income} />
            <Card title="Saídas" value={totals.expense} />
            <Card title="Saldo" value={totals.balance} />
          </div>

          {/* GRÁFICO */}
          <div
            className="rounded-3xl p-4 sm:p-6 backdrop-blur
            bg-white border border-zinc-200
            dark:bg-white/10 dark:border-white/10
            transition"
          >
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
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                  : "bg-zinc-200 text-zinc-800 dark:bg-white/10 dark:text-white"
              }`}
            >
              Todas
            </button>

            <button
              onClick={() => setFilter("income")}
              className={`px-4 py-1 rounded-full text-sm transition ${
                filter === "income"
                  ? "bg-green-600 text-white"
                  : "bg-zinc-200 text-zinc-800 dark:bg-white/10 dark:text-white"
              }`}
            >
              Entradas
            </button>

            <button
              onClick={() => setFilter("expense")}
              className={`px-4 py-1 rounded-full text-sm transition ${
                filter === "expense"
                  ? "bg-red-600 text-white"
                  : "bg-zinc-200 text-zinc-800 dark:bg-white/10 dark:text-white"
              }`}
            >
              Saídas
            </button>
          </div>

          {/* LISTA */}
          <List
            items={filteredTransactions}
            onRemove={removeTransaction}
          />

          {/* CRÉDITO */}
          <CreditSection />

        </div>
      </div>
    </CreditProvider>
  );
}
