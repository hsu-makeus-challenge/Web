import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../../mock/cartItems';

export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: cartItems,
  totalAmount: cartItems.reduce((total, item) => total + item.amount, 0),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        state.items[itemIndex].amount += 1;
        state.totalAmount += 1;
      }
    },
    decrement: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex >= 0 && state.items[itemIndex].amount > 0) {
        state.items[itemIndex].amount -= 1;
        state.totalAmount -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        state.totalAmount -= state.items[itemIndex].amount;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    resetCart: (state) => {
      state.items = cartItems;
      state.totalAmount = cartItems.reduce(
        (total, item) => total + item.amount,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, removeItem, resetCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
