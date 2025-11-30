import { useCartInfo } from "../hooks/useCardStore";
import { useModalActions } from "../hooks/useModalStore";

// 가격 및 초기화 컴포넌트
const PriceBox = () => {
    const { total } = useCartInfo();
    const { openModal } = useModalActions();

    return (
        <div className="px-60 py-4 flex items-center justify-between">
            <button
                onClick={openModal}
                className="bg-gray-800 text-white px-4 py-3 rounded-md cursor-pointer"
            >
                장바구니 초기화
            </button>
            <div className="text-gray-800" >총 가격: {total}원</div>
        </div>
    );
};

export default PriceBox;