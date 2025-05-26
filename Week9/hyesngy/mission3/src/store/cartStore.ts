import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types/cart";
import type { CartStore } from "../types/cart";
import cartItems from "../constants/cartItems";

const calculateCartTotals = (items: CartItem[]) => {
	let amount = 0;
	let total = 0;
	for (const item of items) {
		amount += item.amount;
		total += item.amount * Number.parseInt(item.price);
	}
	return { amount, total };
};

export const useCartStore = create<CartStore>()(
	persist(
		(set) => {
			const initialTotals = calculateCartTotals(cartItems);

			return {
				cartItems: cartItems,
				amount: initialTotals.amount,
				total: initialTotals.total,

				increase: (id: string) => {
					set((state) => {
						const newCartItems = state.cartItems.map((item) =>
							item.id === id ? { ...item, amount: item.amount + 1 } : item,
						);

						const { amount, total } = calculateCartTotals(newCartItems);
						return { cartItems: newCartItems, amount, total };
					});
				},

				decrease: (id: string) => {
					set((state) => {
						const newCartItems = state.cartItems
							.map((item) =>
								item.id === id ? { ...item, amount: item.amount - 1 } : item,
							)
							.filter((item) => item.amount > 0);

						const { amount, total } = calculateCartTotals(newCartItems);
						return { cartItems: newCartItems, amount, total };
					});
				},

				removeItem: (id: string) => {
					set((state) => {
						const newCartItems = state.cartItems.filter(
							(item) => item.id !== id,
						);
						const { amount, total } = calculateCartTotals(newCartItems);
						return { cartItems: newCartItems, amount, total };
					});
				},

				clearCart: () => {
					set({ cartItems: [], amount: 0, total: 0 });
				},

				calculateTotals: () => {
					set((state) => {
						const { amount, total } = calculateCartTotals(state.cartItems);
						return { amount, total };
					});
				},
			};
		},
		{
			name: "cart-storage",
			partialize: (state) => ({
				cartItems: state.cartItems,
				amount: state.amount,
				total: state.total,
			}),
		},
	),
);
