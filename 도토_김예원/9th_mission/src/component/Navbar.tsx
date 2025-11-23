import { IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";
import cartItems from "../constants/cartItems";

// 네비바
const Navbar = () => {
    const { amount } = useSelector((state)=>state.cart);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(calculateTotals());
    });

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