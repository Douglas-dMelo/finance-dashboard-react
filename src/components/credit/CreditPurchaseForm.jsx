import { useState } from "react";
import { useCredit } from "./CreditContext";

export default function CreditPurchaseForm() {
  const { cards, addPurchase } = useCredit();

  const [form, setForm] = useState({
    cardId: "",
    store: "",
    total: "",
    installments: 1,
    purchaseDate: "",
  });

  function submit(e) {
    e.preventDefault();

    if (!form.cardId) return;

    addPurchase({
      ...form,
      total: Number(form.total),
      installments: Number(form.installments),
      installmentValue:
        Number(form.total) / Number(form.installments),
    });

    setForm({
      cardId: "",
      store: "",
      total: "",
      installments: 1,
      purchaseDate: "",
    });
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-6 rounded-3xl shadow"
    >
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
        Compra no crédito
      </h3>

      <div className="space-y-3">
        <select
          value={form.cardId}
          onChange={(e) =>
            setForm({ ...form, cardId: e.target.value })
          }
          className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3"
        >
          <option value="">Selecione o cartão</option>
          {cards.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Loja"
          value={form.store}
          onChange={(e) =>
            setForm({ ...form, store: e.target.value })
          }
          className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3"
        />

        <input
          placeholder="Valor total"
          type="number"
          value={form.total}
          onChange={(e) =>
            setForm({ ...form, total: e.target.value })
          }
          className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3"
        />

        <input
          placeholder="Parcelas"
          type="number"
          value={form.installments}
          onChange={(e) =>
            setForm({
              ...form,
              installments: e.target.value,
            })
          }
          className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3"
        />

        <input
          type="date"
          value={form.purchaseDate}
          onChange={(e) =>
            setForm({
              ...form,
              purchaseDate: e.target.value,
            })
          }
          className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
      >
        Lançar compra
      </button>
    </form>
  );
}
