import { useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector, } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

// dispatch가 어떤 action을 받을 수 있는지를 자동 판단함
export const useDispatch: () => AppDispatch = useDefaultDispatch;
// store 전체 상태 타입(RootState)을 자동 적용해서 state 조회를 안전하게 함
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;