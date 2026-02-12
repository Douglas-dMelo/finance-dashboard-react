import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔄 Carrega usuário salvo ao iniciar app
  useEffect(() => {
    const savedUser = localStorage.getItem("finance-user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao recuperar usuário:", error);
        localStorage.removeItem("finance-user");
      }
    }
  }, []);

  // 🔐 Login (modo estudo - sem backend real)
  function login(email) {
    if (!email || !email.includes("@")) {
      alert("Digite um email válido");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem("finance-user", JSON.stringify(newUser));
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
