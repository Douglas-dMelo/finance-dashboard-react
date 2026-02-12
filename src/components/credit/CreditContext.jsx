import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const CreditContext = createContext(null);

export function CreditProvider({ children }) {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (!user) return;

    const data = localStorage.getItem(`credit-${user.email}`);
    if (data) {
      const parsed = JSON.parse(data);
      setCards(parsed.cards || []);
      setPurchases(parsed.purchases || []);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem(
      `credit-${user.email}`,
      JSON.stringify({ cards, purchases })
    );
  }, [cards, purchases, user]);

  function addCard(card) {
    setCards((prev) => [
      ...prev,
      { ...card, id: crypto.randomUUID() },
    ]);
  }

  function addPurchase(purchase) {
    setPurchases((prev) => [
      ...prev,
      { ...purchase, id: crypto.randomUUID() },
    ]);
  }

  return (
    <CreditContext.Provider
      value={{ cards, purchases, addCard, addPurchase }}
    >
      {children}
    </CreditContext.Provider>
  );
}

export function useCredit() {
  return useContext(CreditContext);
}