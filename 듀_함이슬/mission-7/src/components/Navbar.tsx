import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "./Sidebar";
import { getMyInfo } from "../apis/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import useSidebar from "../hooks/useSidebar";


export const Navbar = () => {
    const { accessToken } = useAuth();

    const { isOpen, toggle, close } = useSidebar();

    const navigate = useNavigate();
    const { logout } = useAuth();

    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate("/");
        }
    });

    const handleLogout = async () => {
        mutate();
    }

    const { data } = useQuery({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
        enabled: !!accessToken,
    });


    return (
        <>
            <div className="fixed top-0 w-full flex items-center z-50 gap-5 p-4 bg-gray-100">
                <button onClick={toggle}
                    className="px-1">
                    {isOpen ?
                        (<img src={"/images/burger.svg"} alt="burger image" className="w-6 h-6" />) :
                        (<img src={"/images/burger.svg"} alt="burger image" className="w-6 h-6" />
                        )}
                </button>

                <NavLink to="/"
                    className={({ isActive }) => isActive ? "text-[green] font-bold" : "text-gray-500"}>
                    홈
                </NavLink>


                <div className="ml-auto flex gap-5">
                    {!accessToken && (
                        <>
                            <NavLink to="/login"
                                className={({ isActive }) => isActive ? "text-[green] font-bold" : "text-gray-500"}>
                                로그인
                            </NavLink>

                            <NavLink to="/signup"
                                className={({ isActive }) => isActive ? "text-[green] font-bold" : "text-gray-500"}>
                                회원가입
                            </NavLink>
                        </>
                    )}

                    {accessToken && (
                        <>
                            <div className="text-gray-500">{data?.data?.name}님 반갑습니다.</div>
                            <button
                                className="cursor-pointer text-gray-500"
                                onClick={handleLogout}>
                                로그아웃
                            </button>
                        </>
                    )}
                </div>
            </div>

            <Sidebar width={150} isOpen={isOpen} onClose={close} />

        </>
    );
};