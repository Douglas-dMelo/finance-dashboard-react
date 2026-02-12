import { formatCurrency } from "../utils/formatCurrency";
import { useTransactions } from "../hooks/useTransactions";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { income, expense, balance } = useTransactions();
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white rounded mb-6 p-4">
      {/* TOPO */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Dashboard Financeiro</h2>
          <p className="text-sm text-gray-400">
            Logado como: {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
        >
          Sair
        </button>
      </div>

      {/* RESUMO */}
      <div className="flex justify-between">
        <div>
          <h4>Entradas</h4>
          <p className="text-green-500">
            {formatCurrency(income)}
          </p>
        </div>

        <div>
          <h4>Saídas</h4>
          <p className="text-red-500">
            {formatCurrency(expense)}
          </p>
        </div>

        <div>
          <h4>Saldo</h4>
          <p className="text-blue-500">
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
    </header>
  );
}
