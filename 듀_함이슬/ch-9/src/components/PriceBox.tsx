import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";
import Modal from "./Modal";

const PriceBox = () => {
    const { total } = useCartInfo();
    const { isOpen } = useModalInfo();
    const { openModal } = useModalActions();

    const handleOpenModal = () => {
        openModal();
    };

    return (
        <div className="p-12 flex justify-between">
            <button
                onClick={handleOpenModal}
                className="cursor-pointer border p-4 rounded-md"
            >
                전체 삭제
            </button>
            <div>총 가격: {total}원</div>
            {isOpen && <Modal />}
        </div>
    );
};

export default PriceBox;
