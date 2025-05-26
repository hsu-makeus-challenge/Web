import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "../types/cart";
import cartItems from "../constants/cartItems";

const initialState: CartState = {
	cartItems: cartItems,
	amount: 0,
	total: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		increase: (state, action: PayloadAction<string>) => {
			const cartItem = state.cartItems.find(
				(item) => item.id === action.payload,
			);
			if (cartItem) {
				cartItem.amount = cartItem.amount + 1;
			}
		},
		decrease: (state, action: PayloadAction<string>) => {
			const cartItem = state.cartItems.find(
				(item) => item.id === action.payload,
			);
			if (cartItem) {
				cartItem.amount = cartItem.amount - 1;
				if (cartItem.amount < 1) {
					state.cartItems = state.cartItems.filter(
						(item) => item.id !== action.payload,
					);
				}
			}
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== action.payload,
			);
		},
		clearCart: (state) => {
			state.cartItems = [];
			state.amount = 0;
			state.total = 0;
		},
		calculateTotals: (state) => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach((item) => {
				amount += item.amount;
				total += item.amount * Number.parseInt(item.price);
			});
			state.amount = amount;
			state.total = total;
		},
	},
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
	cartSlice.actions;
export default cartSlice.reducer;
