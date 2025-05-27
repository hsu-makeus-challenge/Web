// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cart: { [id: string]: number };
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  getTotalCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ [id: string]: number }>({});

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev, [id]: prev[id] - 1 };
      if (updated[id] <= 0) delete updated[id];
      return updated;
    });
  };

  const getTotalCount = () => Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart는 CartProvider 내에서만 사용해야 합니다.');
  return ctx;
};