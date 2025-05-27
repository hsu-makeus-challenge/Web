import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../../constants/cartItems';

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
  totalCount: number;
}

const initialState: CartState = {
  items: cartItems,
  totalAmount: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        if (state.items[itemIndex].amount > 1) {
          state.items[itemIndex].amount -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let count = 0;
      state.items.forEach(item => {
        amount += Number(item.price) * item.amount;
        count += item.amount;
      });
      state.totalAmount = amount;
      state.totalCount = count;
    }
  }
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
