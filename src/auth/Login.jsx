import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    login(email);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 p-8 rounded-3xl w-full max-w-sm"
      >
        <h1 className="text-2xl text-white font-bold mb-6 text-center">
          Entrar
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-zinc-900 text-white border border-white/10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
          Acessar
        </button>
      </form>
    </div>
  );
}
