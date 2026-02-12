export default function CreditDashboard({ card, purchases }) {
  const used = purchases
    .filter((p) => p.cardId === card.id)
    .reduce((acc, p) => acc + p.total, 0);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-xl font-bold text-white mb-2">
        {card.name}
      </h2>

      <p className="text-zinc-400">
        Limite: R$ {card.limit}
      </p>
      <p className="text-zinc-400">
        Usado: R$ {used}
      </p>
      <p className="text-green-400 font-semibold">
        Disponível: R$ {card.limit - used}
      </p>
    </div>
  );
}