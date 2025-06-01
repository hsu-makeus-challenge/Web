import type { CartItem, CartState } from './cart';

export interface CartStore extends CartState {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  setCartItems: (items: CartItem[]) => void;
}
