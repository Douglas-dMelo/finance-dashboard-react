export function getInvoiceMonth(purchaseDate, closingDay) {
  const date = new Date(purchaseDate);
  const purchaseDay = date.getDate();

  if (purchaseDay <= closingDay) return 0;
  return 1;
}

export function generateInstallments(transaction, card) {
  const startOffset = getInvoiceMonth(
    transaction.purchaseDate,
    card.closingDay
  );

  return Array.from({ length: transaction.installments }).map((_, i) => ({
    monthOffset: startOffset + i,
    value: transaction.installmentValue,
  }));
}

export function calculateUsedLimit(transactions) {
  return transactions.reduce(
    (acc, t) => acc + t.installmentValue,
    0
  );
}