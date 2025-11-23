import cartItems from "../constants/cartItems";
import CartItem from "./CartItem";
import { useSelector } from "../hooks/useCustomRedux";

// 장바구니 목록 list 컴포넌트
const CartList = () => {
    const { cartItems } = useSelector((state)=>state.cart);

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