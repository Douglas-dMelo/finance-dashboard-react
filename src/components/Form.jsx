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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow mb-6">
      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Descrição"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        className="border p-2 w-full mb-2 rounded"
        placeholder="Valor"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <select
        className="border p-2 w-full mb-2 rounded"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="income">Entrada</option>
        <option value="expense">Saída</option>
      </select>
      <button type="submit" className="bg-black text-white px-4 py-2 rounded-xl w-full">
        Adicionar
      </button>
    </form>
  );
}