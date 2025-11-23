import CartItem from "./CartItem";
import { useCartInfo } from "../hooks/useCardStore";

// 장바구니 목록 list 컴포넌트
const CartList = () => {
    const { cartItems } = useCartInfo();

    return (
        <div className="flex flex-col items-center justiy-center">
            <ul>
                {cartItems.map((item) => (
                    <CartItem key={item.id} lp={item} />
                ))}
            </ul>
        </div>
    );
};

export default CartList;