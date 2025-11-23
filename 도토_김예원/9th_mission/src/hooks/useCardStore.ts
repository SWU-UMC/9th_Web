import { create } from "zustand";
import type { CartItems } from "../type/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

// 액션만 따로
interface CartActions {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;

    actions: CartActions;
}

// 전체 상태 + 액션
// create()로 zustand store 생성 
export const useCartStore = create<CartState>()(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    immer((set, _) => ({
        //  초기값
        cartItems: cartItems,
        amount: 0,
        total: 0,
        actions: {
            increase: (id: string) => {
                set((state) => {
                    const cartItem = state.cartItems.find(
                        (item) => item.id === id
                    );

                    if (cartItem) {
                        cartItem.amount += 1;
                    }
                });
            },
            decrease: (id: string) => {
                set((state) => {
                    const cartItem = state.cartItems.find(
                        (item) => item.id === id
                    );

                    if (cartItem && cartItem.amount > 0) {
                        cartItem.amount -= 1;
                    }
                });
            },
            removeItem: (id: string) => {
                set((state) => {
                    state.cartItems = state.cartItems.filter(
                        (item) => item.id !== id
                    );
                });
            },
            clearCart: () => {
                set((state) => {
                    state.cartItems = [];
                });
            },
            calculateTotals: () => {
                set((state) => {
                    let amount = 0;
                    let total = 0;

                    state.cartItems.forEach((item) => {
                        amount += item.amount;
                        total += item.amount * Number(item.price);
                    });

                    state.amount = amount;
                    state.total = total;
                });
            },
        },
    }))
);

// 상태만 가져 오는 훅
// cartItems, amount, total 이 변해야 컴포넌트가 렌더
export const useCartInfo = () =>
    useCartStore(
        useShallow((state) => ({
            cartItems: state.cartItems,
            amount: state.amount,
            total: state.total,
        }))
    );

// 액션만 가져오는 훅
export const useCartActions = () => useCartStore((state) => state.actions);