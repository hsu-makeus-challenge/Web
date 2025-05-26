import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice'
import modalRedcer from '../features/modal/modalSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalRedcer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch