import { useState } from "react";

export default function Form({ onAdd }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "income",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({
      ...form,
      amount: Number(form.amount),
    });
    setForm({ description: "", amount: "", type: "income" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white/10 backdrop-blur
        border border-white/10
        p-6 rounded-3xl shadow-lg
        mb-6 space-y-4
        max-w-2xl mx-auto
      "
    >
      {/* DESCRIÇÃO */}
      <input
        type="text"
        placeholder="Descrição"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="
          w-full bg-zinc-900/80 text-white
          placeholder-zinc-400
          border border-white/10
          rounded-xl px-4 py-3
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      {/* VALOR */}
      <input
        type="number"
        placeholder="Valor"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
        className="
          w-full bg-zinc-900/80 text-white
          placeholder-zinc-400
          border border-white/10
          rounded-xl px-4 py-3
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      {/* TIPO */}
      <select
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
        className="
          w-full bg-zinc-900/80 text-white
          border border-white/10
          rounded-xl px-4 py-3
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        <option value="income">Entrada</option>
        <option value="expense">Saída</option>
      </select>

      {/* BOTÃO */}
      <button
        type="submit"
        className="
          w-full bg-gradient-to-r from-blue-500 to-blue-600
          text-white font-semibold
          py-3 rounded-xl
          hover:opacity-90 transition
        "
      >
        Adicionar
      </button>
    </form>
  );
}