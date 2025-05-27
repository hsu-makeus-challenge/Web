import { create } from 'zustand';

export interface CartItemType {
  id: string; 
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
}

interface CartState {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],

  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map((i) =>
          i.id === item.id ? { ...i, amount: i.amount + 1 } : i
        ),
      };
    } else {
      return {
        cartItems: [...state.cartItems, { ...item, amount: 0 }],
      };
    }
  }),

  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== id),
  })),

  increaseQuantity: (id) => set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    ),
  })),

  decreaseQuantity: (id) => set((state) => {
    const updatedItems = state.cartItems
      .map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      )
      .filter((item) => item.amount > 0);
    return { cartItems: updatedItems };
  }),

  clearCart: () => set({ cartItems: [] }),
}));
