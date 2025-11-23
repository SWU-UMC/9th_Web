import { useDispatch, useSelector } from "../hooks/useCustomRedux";
// import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

// 가격 및 초기화 컴포넌트
const PriceBox = () => {
    const { total } = useSelector((state)=>state.cart);
    const dispatch =useDispatch();

    const handleInitializeCart =()=>{
        // dispatch(clearCart());
        // 모달이 나타나도록
        dispatch(openModal());
    };

    return (
        <div className="px-60 py-4 flex items-center justify-between">
            <button
                onClick={handleInitializeCart}
                className="bg-gray-800 text-white px-4 py-3 rounded-md cursor-pointer"
            >
                장바구니 초기화
            </button>
            <div className="text-gray-800" >총 가격: {total}원</div>
        </div>
    );
};

export default PriceBox;