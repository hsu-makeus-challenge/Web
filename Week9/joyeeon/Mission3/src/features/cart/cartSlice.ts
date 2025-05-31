import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/playlistitem";
import cartItems from "../../constants/cartItems";

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: cartItems,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<string>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                item.amount += 1;
            }
        },
        decrement: (state, action: PayloadAction<string>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                item.amount -= 1;
                if (item.amount < 1) {
                    // 1보다 작으면 제거
                    state.items = state.items.filter((i) => i.id !== action.payload);
                }
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
        clearCart: (state) => {
                state.items = [];
        }
    }
})

export const { increment, decrement, removeItem , clearCart} = cartSlice.actions

export default cartSlice.reducer