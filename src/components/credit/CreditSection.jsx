import React from "react";
import CreditCardForm from "./CreditCardForm";
import CreditPurchaseForm from "./CreditPurchaseForm";
import CreditDashboard from "./CreditDashboard";
import CreditInstallmentsTimeline from "./CreditInstallmentsTimeline";
import { useCredit } from "./CreditContext";
import Card from "../Card";
import FinanceChart from "../FinanceChart";

// Mini-dashboard de cartão
function CreditCardMiniDashboard({ card, purchases }) {
  const cardPurchases = purchases.filter((p) => p.cardId === card.id);
  const totalSpent = cardPurchases.reduce((acc, p) => acc + p.total, 0);
  const available = card.limit - totalSpent;

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-6">
      <h3 className="text-lg font-semibold text-white">{card.name}</h3>

      {/* Cards resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Limite" value={card.limit} />
        <Card title="Gasto total" value={totalSpent} />
        <Card title="Disponível" value={available} />
      </div>

      {/* Gráfico de despesas do cartão */}
      <div className="bg-white/5 p-4 rounded-2xl">
        <h4 className="text-white font-semibold mb-2">Resumo de Gastos</h4>
        {cardPurchases.length > 0 ? (
          <FinanceChart income={0} expense={totalSpent} />
        ) : (
          <p className="text-white/70 text-center">
            Nenhuma compra registrada para este cartão.
          </p>
        )}
      </div>

      {/* Dashboard detalhado */}
      <CreditDashboard card={card} purchases={cardPurchases} />

      {/* Timeline de parcelas */}
      <CreditInstallmentsTimeline card={card} transactions={cardPurchases} />
    </div>
  );
}

// Componente principal da seção de crédito
export default function CreditSection() {
  const { cards, purchases } = useCredit();

  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-bold text-white">Cartões de Crédito</h2>

      {/* Formulários lado a lado */}
      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <CreditCardForm />
        <CreditPurchaseForm />
      </div>

      {/* Mini-dashboards ou mensagem */}
      {cards.length > 0 ? (
        <div className="mt-10 grid md:grid-cols-1 gap-8">
          {cards.map((card) => (
            <CreditCardMiniDashboard
              key={card.id}
              card={card}
              purchases={purchases}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-white/70 text-center">
          Nenhum cartão cadastrado. Crie um cartão para começar a acompanhar suas compras!
        </p>
      )}
    </section>
  );
}