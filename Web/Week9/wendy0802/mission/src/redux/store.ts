import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import modalReducer from './modal/modalSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 