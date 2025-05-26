import { create } from 'zustand';
import cartItems from '../../mock/cartItems';

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartStore {
  items: CartItem[];
  totalAmount: number;
  action: {
    setCart: (id: string) => void;
    handleIncrement: (id: string) => void;
    handleDecrement: (id: string) => void;
    resetCart: () => void;
    deleteAll: () => void;
  };
}

const useCartStore = create<CartStore>((set) => ({
  items: cartItems,
  totalAmount: cartItems.reduce((total, item) => total + item.amount, 0),
  action: {
    setCart: (id: string) => {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item
        ),
      }));
    },
    handleIncrement: (id: string) => {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item
        ),
        totalAmount: state.totalAmount + 1,
      }));
    },
    handleDecrement: (id: string) => {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        ),
        totalAmount: state.totalAmount - 1,
      }));
    },
    resetCart: () => {
      set({
        items: cartItems,
        totalAmount: cartItems.reduce((total, item) => total + item.amount, 0),
      });
    },
    deleteAll: () => {
      set({
        items: [],
        totalAmount: 0,
      });
    },
  },
}));

export default useCartStore;
