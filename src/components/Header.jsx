import { formatCurrency } from "../utils/formatCurrency";
import { useTransactions } from "../hooks/useTransactions";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export default function Header() {
  const { income, expense, balance } = useTransactions();
  const { user, logout } = useAuth();

  return (
    <header
      className="
        rounded-3xl p-6 mb-8
        backdrop-blur-md
        bg-white border border-zinc-200
        dark:bg-white/10 dark:border-white/10
        transition-colors duration-300
      "
    >
      {/* TOPO */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Dashboard Financeiro
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Bem-vindo,{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {user?.email}
            </span>
          </p>
        </div>

        <button
          onClick={logout}
          className="
            flex items-center gap-2
            px-4 py-2 rounded-xl
            bg-red-600 hover:bg-red-700
            text-white text-sm font-medium
            transition-all
          "
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>

      {/* RESUMO */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="rounded-2xl p-4 bg-green-500/10 border border-green-500/20">
          <h4 className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            Entradas
          </h4>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {formatCurrency(income)}
          </p>
        </div>

        <div className="rounded-2xl p-4 bg-red-500/10 border border-red-500/20">
          <h4 className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            Saídas
          </h4>
          <p className="text-lg font-bold text-red-600 dark:text-red-400">
            {formatCurrency(expense)}
          </p>
        </div>

        <div className="rounded-2xl p-4 bg-blue-500/10 border border-blue-500/20">
          <h4 className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            Saldo
          </h4>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
    </header>
  );
}
