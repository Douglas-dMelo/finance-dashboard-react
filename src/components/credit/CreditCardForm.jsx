import { useState } from "react";
import { useCredit } from "./CreditContext";

export default function CreditCardForm() {
  const { addCard } = useCredit();
  const [form, setForm] = useState({
    name: "",
    limit: "",
    closingDay: "",
    dueDay: "",
  });

  function submit(e) {
    e.preventDefault();

    addCard({
      ...form,
      limit: Number(form.limit),
      closingDay: Number(form.closingDay),
      dueDay: Number(form.dueDay),
    });

    setForm({ name: "", limit: "", closingDay: "", dueDay: "" });
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-6 rounded-3xl shadow"
    >
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
        Cartão de crédito
      </h3>

      <div className="space-y-3">
        <input
          placeholder="Nome do cartão"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3"
        />

        <input
          placeholder="Limite"
          type="number"
          value={form.limit}
          onChange={(e) => setForm({ ...form, limit: e.target.value })}
          className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3"
        />

        <input
          placeholder="Fechamento da fatura"
          type="number"
          value={form.closingDay}
          onChange={(e) =>
            setForm({ ...form, closingDay: e.target.value })
          }
          className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3"
        />

        <input
          placeholder="Vencimento"
          type="number"
          value={form.dueDay}
          onChange={(e) =>
            setForm({ ...form, dueDay: e.target.value })
          }
          className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
      >
        Salvar cartão
      </button>
    </form>
  );
}
