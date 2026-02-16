import { api } from "./api";

export async function loginUser(email) {
  const response = await api.get(`/users?email=${email}`);

  if (response.data.length > 0) {
    return response.data[0];
  }

  const newUser = await api.post("/users", {
    email,
    createdAt: new Date().toISOString(),
  });

  return newUser.data;
}
