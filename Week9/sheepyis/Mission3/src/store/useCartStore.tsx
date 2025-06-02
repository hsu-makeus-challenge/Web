import { create } from 'zustand';
import cartItems from '../constants/cartItems';
import type { CartItem } from '../types/cart';
import type { CartStore } from '../types/cartStore';

const parsedCartItems: CartItem[] = cartItems.map(item => ({
    ...item,
    price: Number(item.price),
}));

export const useCartStore = create<CartStore>((set, get) => ({
    cartItems: parsedCartItems,
    totalQuantity: 0,
    totalAmount: 0,

    // 추가
    increase: (id) => {
        const updated = get().cartItems.map(item =>
            item.id === id ? { ...item, amount: item.amount + 1 } : item
        );
        set({ cartItems: updated });
        get().calculateTotals();
    },

    // 삭제
    decrease: (id) => {
        const updated = get().cartItems
        .map(item =>
            item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter(item => item.amount > 0);
        set({ cartItems: updated });
        get().calculateTotals();
    },

    // 아이템 삭제
    removeItem: (id) => {
        const updated = get().cartItems.filter(item => item.id !== id);
        set({ cartItems: updated });
        get().calculateTotals();
    },

    // 전체 삭제
    clearCart: () => {
        set({ cartItems: [], totalQuantity: 0, totalAmount: 0 });
    },

    // 계산
    calculateTotals: () => {
        const { cartItems } = get();
        let totalQuantity = 0;
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalQuantity += item.amount;
            totalAmount += item.price * item.amount;
        });
        set({ totalQuantity, totalAmount });
    },

    setCartItems: (items) => {
        set({ cartItems: items });
        get().calculateTotals();
    },
}));
