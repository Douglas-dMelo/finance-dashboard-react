import { api } from "./api";

// 🔹 Buscar transações por usuário
export async function getTransactions(userId) {
  const response = await api.get(`/transactions?userId=${userId}`);
  return response.data;
}

// 🔹 Criar transação
export async function createTransaction(transaction) {
  const response = await api.post("/transactions", transaction);
  return response.data;
}

// 🔹 Deletar transação
export async function deleteTransaction(id) {
  await api.delete(`/transactions/${id}`);
}
