import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export function useCreditCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("credit-cards");
    if (data) setCards(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("credit-cards", JSON.stringify(cards));
  }, [cards]);

  function addCard(card) {
    setCards((prev) => [...prev, { ...card, id: uuid() }]);
  }

  return { cards, addCard };
}