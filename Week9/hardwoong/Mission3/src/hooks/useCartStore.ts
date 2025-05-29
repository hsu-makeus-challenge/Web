import type { CartItems } from "../types/cart";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";

// cartItems의 합계를 미리 계산 -> calculateTotals 함수 대신 사용
const initialCartItems = [...cartItems];
let initialAmount = 0;
let initialTotal = 0;
initialCartItems.forEach(item => {
  initialAmount += item.amount;
  initialTotal += item.amount * item.price;
});

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

interface CartState {
  cartItems: CartItems;
  total: number;
  amount: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set): CartState => ({
      cartItems: initialCartItems,
      amount: initialAmount,
      total: initialTotal,
      actions: {
        increase: (id: string): void => {
          set((state): void => {
            const cartItem = state.cartItems.find((item): boolean => item.id === id);
            if (cartItem) {
              cartItem.amount += 1;
              toast.success(`${cartItem.title} 수량이 증가했습니다!`);
            }
            // 합계 자동 계산
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item): void => {
              amount += item.amount;
              total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
          });
        },
        decrease: (id: string): void => {
          set((state): void => {
            const cartItem = state.cartItems.find((item): boolean => item.id === id);
            if (cartItem && cartItem.amount > 0) {
              cartItem.amount -= 1;
              toast.info(`${cartItem.title} 수량이 감소했습니다.`);
            }
            // 합계 자동 계산
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item): void => {
              amount += item.amount;
              total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
          });
        },
        removeItem: (id: string): void => {
          set((state): void => {
            const cartItem = state.cartItems.find((item): boolean => item.id === id);
            state.cartItems = state.cartItems.filter((item): boolean => item.id !== id);
            if (cartItem) toast.error(`${cartItem.title}이(가) 장바구니에서 삭제되었습니다.`);
            // 합계 자동 계산
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item): void => {
              amount += item.amount;
              total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
          });
        },
        clearCart: (): void => {
          set((state): void => {
            state.cartItems = [];
            toast.warn("장바구니가 비워졌습니다.");
            // 합계 자동 계산
            state.amount = 0;
            state.total = 0;
          });
        },
      },
    })),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cartItems: state.cartItems,
        amount: state.amount,
        total: state.total,
        // actions는 persist 대상에서 제외!
      }),
    }
  )
);

export const useCartInfo = (): { cartItems: CartItems; amount: number; total: number } =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

// actions가 undefined일 경우를 대비해 fallback 제공
export const useCartActions = (): CartActions =>
  useCartStore((state) =>
    state.actions ?? {
      increase: () => {},
      decrease: () => {},
      removeItem: () => {},
      clearCart: () => {},
    }
  );

