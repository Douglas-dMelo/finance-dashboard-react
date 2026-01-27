import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";

export default function List({ items, onRemove }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ description: "", amount: "" });

  function startEdit(item, index) {
    setEditingIndex(index);
    setEditForm({ description: item.description, amount: item.amount });
  }

  function saveEdit(index) {
    items[index].description = editForm.description;
    items[index].amount = Number(editForm.amount);
    setEditingIndex(null);
  }

  return (
    <ul className="bg-white/10 backdrop-blur border border-white/10 rounded-3xl shadow divide-y divide-white/10">
      {items.map((t, i) => (
        <li
          key={i}
          className={`flex justify-between items-center p-4 ${
            t.type === "income" ? "border-l-4 border-green-500" : "border-l-4 border-red-500"
          }`}
        >
          {editingIndex === i ? (
            <div className="flex gap-2 w-full">
              <input
                className="border p-1 flex-1 rounded"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
              <input
                type="number"
                className="border p-1 w-28 rounded"
                value={editForm.amount}
                onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
              />
              <button onClick={() => saveEdit(i)} className="text-green-400 font-bold">
                ✔
              </button>
            </div>
          ) : (
            <>
              <span className="text-zinc-200">
                {t.description} — <strong>{formatCurrency(t.amount)}</strong>
              </span>
              <div className="flex gap-3">
                <button onClick={() => startEdit(t, i)} className="text-blue-400">
                  <Pencil size={18} />
                </button>
                <button onClick={() => onRemove(i)} className="text-red-400">
                  <Trash2 size={18} />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}