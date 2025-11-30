import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../type/cart";

// 상태 타입 정의
export interface CartState {
    cartItems: CartItems;
    // 총 수량
    amount: number; 
    // 총 금액
    total: number;
}

const initialState: CartState = {
    // 기본 cartItems 목록
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

// cartSlice 생성
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // 수량 증가 
        increase: (state, action: PayloadAction<{ id: string }>) => {
            const itemId = action.payload.id;
            // 아이디를 통해 내가 클릭한 lp를 찾음
            const item = state.cartItems.find(
                (cartItem) => cartItem.id === itemId
            );

            // 있는 경우 수량 증가
            if (item) {
                item.amount += 1;
            }
        },
        // 수량 감소
        decrease: (state, action: PayloadAction<{ id: string }>) => {
            const itemId = action.payload.id;
            const item = state.cartItems.find(
                (cartItem) => cartItem.id === itemId
            );

            // 있는 경우 수량 감소
            if (item) {
                item.amount -= 1;
            }
        },
        // removeItem 아이템 제거
        removeItem: (state, action: PayloadAction<{ id: string }>) => {
            const itemId = action.payload.id;
            // 해당 아이디를 제외하고 새 배열로 반환
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== itemId
            );
        },
        // clearCart 장바구니 비우기
        clearCart: (state) => {
            // 빈 배열로 만들어 버리기
            state.cartItems = [];
        },
        // 총 수량 및 총 금액 계산
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * Number(item.price);
            });

            state.amount = amount;
            state.total = total;
        },
    },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
    cartSlice.actions;

// duck pattern reducer는 export default로 내보내야함
const cartReducer = cartSlice.reducer;

export default cartReducer;