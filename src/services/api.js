const API_URL = "http://localhost:3001";

export async function loginUser(email) {
  const res = await fetch(`${API_URL}/users?email=${email}`);
  const users = await res.json();

  if (users.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  return users[0];
}

export async function getTransactions(userId) {
  const res = await fetch(
    `${API_URL}/transactions?userId=${userId}`
  );
  return res.json();
}

export async function createTransaction(tx) {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx),
  });

  return res.json();
}

export async function deleteTransaction(id) {
  await fetch(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });
}
