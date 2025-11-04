import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const MOBILE_BREAKPOINT = 768;

export const Navbar = () => {
    const { accessToken } = useAuth();

    const [isSidebarOpen, setIsSidebarOpen] = useState(
        window.innerWidth >= MOBILE_BREAKPOINT
    );

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getMyInfo();

                setData(response);
            } catch (error) {
                console.error("정보 가져오기 실패", error);
                setData(null);
            }
        };

        if (accessToken) {
            getData();
        } else {
            setData(null);
        }
    }, [accessToken]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < MOBILE_BREAKPOINT) {
                setIsSidebarOpen(false)}
            else { setIsSidebarOpen(true) }
            };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <>
            <div className="fixed top-0 w-full flex items-center z-50 gap-5 p-4 bg-gray-100">
                <button onClick={toggleSidebar}
                    className="px-1">
                    {isSidebarOpen ?
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

            <Sidebar width={150} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        </>
    );
};