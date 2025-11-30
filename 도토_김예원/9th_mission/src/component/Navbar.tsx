import { IoCart } from "react-icons/io5";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCardStore";

// 네비바
const Navbar = () => {
    const { amount, cartItems } = useCartInfo();
    const { calculateTotals } = useCartActions();

    useEffect(() => {
        calculateTotals();
    }, [cartItems, calculateTotals]);

    return (
        <div className="flex justify-between items-center px-10 py-4 bg-gray-800 text-white">
            <h1
            // 로고 홈 화면 연결
                onClick={() => {
                    window.location.href = "/";
                }}
                className="text-xl font-semibold cursor-pointer"
            >
                CartList
            </h1>
            <div className="flex itmes-center gap-2">
                <IoCart className="text-3xl" />
                <span className="text-lg font-medium">{amount}</span>
            </div>
        </div>
    );
};

export default Navbar;