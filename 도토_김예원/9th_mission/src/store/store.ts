import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

// 저장소 생성
function createStore() {
    const store = configureStore({
        // 리듀서 설정
        // slice 등록
        reducer: {
            cart: cartReducer,
        },
    });

    return store;
}

// store를 활용할 수 있도록 내보내기
const store = createStore();
export default store;

// Redux toolkit에서 복사
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

