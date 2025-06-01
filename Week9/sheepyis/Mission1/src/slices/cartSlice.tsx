import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../types/cart';
import cartItems from "../constants/cartItems";

const parsedCartItems: CartItem[] = cartItems.map(item => ({
  ...item,
  price: Number(item.price),
}));

const initialState: CartState = {
  cartItems: parsedCartItems,
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 증가
    increase(state, action: PayloadAction<string>) {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) item.amount += 1;
    },

    // 감소
    decrease(state, action: PayloadAction<string>) {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        }
      }
    },

    // 삭제
    removeItem(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },

    // 전체 삭제
    clearCart(state) {
      state.cartItems = [];
    },

    // 전체 계산
    calculateTotals(state) {
      let quantity = 0;
      let amount = 0;
      state.cartItems.forEach(item => {
        quantity += item.amount;
        amount += item.price * item.amount;
      });
      state.totalQuantity = quantity;
      state.totalAmount = amount;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
