import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ adicionamos controle de carregamento

  // 🔄 Carrega usuário salvo ao iniciar app
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("finance-user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário:", error);
      localStorage.removeItem("finance-user");
    } finally {
      setLoading(false); // ✅ evita bug de renderização precoce
    }
  }, []);

  // 🔐 Login usando API fake
async function login(email) {
  if (!email || !email.includes("@")) {
    alert("Digite um email válido");
    return false;
  }

  try {
    const userData = await loginUser(email);

    setUser(userData);
    localStorage.setItem("finance-user", JSON.stringify(userData));

    return true; // 👈 ISSO É FUNDAMENTAL
  } catch {
    alert("Erro ao realizar login");
    return false;
  }
}

  // 🚪 Logout
  function logout() {
    setUser(null);
    localStorage.removeItem("finance-user");
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  // ✅ evita renderizar a aplicação antes de saber se há usuário salvo
  if (loading) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}