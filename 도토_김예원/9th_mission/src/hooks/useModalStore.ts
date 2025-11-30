import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

// 액션 타입 먼저 정의
interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

// 상태 타입 정의
interface ModalState {
  isOpen: boolean;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,

    actions: {
      openModal: () => {
        set((state) => {
          state.isOpen = true;
        });
      },

      closeModal: () => {
        set((state) => {
          state.isOpen = false;
        });
      },
    },
  }))
);

// 상태만 내보내는 훅
export const useModalInfo = () =>
  useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
    }))
  );

//   액션만 내보내는 훅
export const useModalActions = () =>
  useModalStore((state) => state.actions);