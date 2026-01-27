import { ArrowDown, ArrowUp, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function Card({ title, value }) {
  const isIncome = title === "Entradas";
  const isExpense = title === "Saídas";

  const color = isIncome
    ? "text-green-400"
    : isExpense
    ? "text-red-400"
    : "text-blue-400";

  const Icon = isIncome
    ? ArrowUp
    : isExpense
    ? ArrowDown
    : Wallet;

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-3xl shadow-lg hover:scale-[1.02] transition-all">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-zinc-300">{title}</h3>
        <Icon className={color} size={22} />
      </div>

      <p className={`text-3xl font-bold ${color}`}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}