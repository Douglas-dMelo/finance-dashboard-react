import { formatCurrency } from "../utils/formatCurrency";
import { useTransactions } from "../hooks/useTransactions";

export default function Header() {
  const { income, expense, balance } = useTransactions();

  return (
    <header className="flex justify-between p-4 bg-gray-900 text-white rounded mb-6">
      <div>
        <h4>Entradas</h4>
        <p className="text-green-500">{formatCurrency(income)}</p>
      </div>
      <div>
        <h4>Saídas</h4>
        <p className="text-red-500">{formatCurrency(expense)}</p>
      </div>
      <div>
        <h4>Saldo</h4>
        <p className="text-blue-500">{formatCurrency(balance)}</p>
      </div>
    </header>
  );
}