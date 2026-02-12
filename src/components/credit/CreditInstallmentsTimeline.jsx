import { generateInstallments } from "../../utils/creditCalculations";

export default function CreditInstallmentsTimeline({ card, transactions }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Parcelas futuras
      </h3>

      <ul className="space-y-2">
        {transactions
          .filter((t) => t.cardId === card.id)
          .flatMap((t) =>
            generateInstallments(t, card).map((inst, i) => (
              <li
                key={`${t.id}-${i}`}
                className="flex justify-between text-zinc-300"
              >
                <span>
                  {t.store} • {i + 1}/{t.installments}
                </span>
                <span>
                  R$ {inst.value.toFixed(2)}
                </span>
              </li>
            ))
          )}
      </ul>
    </div>
  );
}
