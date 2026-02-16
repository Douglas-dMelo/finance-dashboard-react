import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from "@/services/transactionService";

import Card from "@/components/Card";
import Form from "@/components/Form";
import List from "@/components/List";
import FinanceChart from "@/components/FinanceChart";
import CreditSection from "@/components/credit/CreditSection";
import { CreditProvider } from "@/components/credit/CreditContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🔒 Proteção
  if (!user) return null;

  // =========================
  // 🎨 TEMA
  // =========================
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

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

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // =========================
  // 💰 TRANSAÇÕES
  // =========================
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user) return;

    async function loadTransactions() {
      try {
        const data = await getTransactions(user.id);
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    loadTransactions();
  }, [user]);

  // 🔹 Totais
  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === "income") acc.income += Number(t.amount);
      else acc.expense += Number(t.amount);
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );

  // 🔹 Criar transação
  async function addTransaction(tx) {
    try {
      const newTransaction = await createTransaction({
        ...tx,
        userId: user.id,
      });

      setTransactions((prev) => [...prev, newTransaction]);
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  }

  // 🔹 Remover transação
  async function removeTransaction(id) {
    try {
      await deleteTransaction(id);

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  }

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <CreditProvider>
      <div className="min-h-screen p-6 bg-gradient-to-br from-zinc-100 via-zinc-200 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-black transition-colors duration-500">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                Dashboard Financeiro
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Logado como: {user.email}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-zinc-900 text-white dark:bg-white dark:text-black transition-all"
              >
                {theme === "dark" ? "☀️ Claro" : "🌙 Escuro"}
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                Sair
              </button>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Entradas" value={totals.income} />
            <Card title="Saídas" value={totals.expense} />
            <Card title="Saldo" value={totals.balance} />
          </div>

          {/* GRÁFICO */}
          <div className="rounded-3xl p-6 backdrop-blur bg-white border border-zinc-200 dark:bg-white/10 dark:border-white/10">
            <FinanceChart
              income={totals.income}
              expense={totals.expense}
            />
          </div>

          {/* FORM */}
          <Form onAdd={addTransaction} />

          {/* FILTROS */}
          <div className="flex flex-wrap gap-3">
            {["all", "income", "expense"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-1 rounded-full text-sm transition ${
                  filter === type
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                    : "bg-zinc-200 text-zinc-800 dark:bg-white/10 dark:text-white"
                }`}
              >
                {type === "all"
                  ? "Todas"
                  : type === "income"
                  ? "Entradas"
                  : "Saídas"}
              </button>
            ))}
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
