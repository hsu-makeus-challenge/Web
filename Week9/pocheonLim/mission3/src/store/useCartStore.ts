import { create } from 'zustand';
import cartItems from '../constants/cartItems';

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalPrice: number;
  increaseAmount: (id: string) => void;
  decreaseAmount: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: cartItems,
  totalAmount: cartItems.length,
  totalPrice: cartItems.reduce((total, item) => total + Number(item.price), 0),
  increaseAmount: (id) => set((state) => {
    const items = state.items.map(item =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    return { items };
  }),
  decreaseAmount: (id) => set((state) => {
    const item = state.items.find(item => item.id === id);
    if (item && item.amount > 1) {
      const items = state.items.map(item =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      );
      return { items };
    } else {
      const items = state.items.filter(item => item.id !== id);
      return { items };
    }
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clearCart: () => set({ items: [] }),
  calculateTotals: () => {
    const { items } = get();
    const totalAmount = items.reduce((total, item) => total + item.amount, 0);
    const totalPrice = items.reduce((total, item) => total + Number(item.price) * item.amount, 0);
    set({ totalAmount, totalPrice });
  }
})); 