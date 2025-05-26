import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: cartItems,
  totalAmount: cartItems.length,
  totalPrice: cartItems.reduce((total, item) => total + Number(item.price), 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseAmount: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.amount += 1;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    decreaseAmount: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.amount > 1) {
        item.amount -= 1;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
    calculateTotals: (state) => {
      state.totalAmount = state.items.reduce((total, item) => total + item.amount, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (Number(item.price) * item.amount), 0);
    }
  },
});

export const { increaseAmount, decreaseAmount, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer; 