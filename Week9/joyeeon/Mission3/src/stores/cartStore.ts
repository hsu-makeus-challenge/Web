import { create } from 'zustand';
import type { CartItem } from '../types/playlistitem';
import cartItems from "../constants/cartItems";

export interface CartState {
    items: CartItem[]
    increment: (id: string) => void
    decrement: (id: string) => void
    removeItem: (id: string) => void
    clearCart: () => void

}

export const useCartStore = create<CartState>()(
    (set) => ({
        items: cartItems,

        increment: (id) =>
            set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? { ...item, amount: item.amount + 1 } : item
                ),
            })),

        decrement: (id) =>
            set((state) => ({
                items: state.items
                    .map((item) =>
                        item.id === id ? { ...item, amount: item.amount - 1 } : item
                    )
                    .filter((item) => item.amount > 0),
            })),

        removeItem: (id) =>
            set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            })),

        clearCart: () => set({ items: [] }),
    }),
)