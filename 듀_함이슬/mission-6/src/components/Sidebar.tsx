import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

interface SidebarProps {
    width?: number;
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ width = 280, isOpen, onClose }: SidebarProps) => {
    const { accessToken } = useAuth();
    const xPosition = isOpen ? 0 : -width;

    return (
        <>
            <div className="fixed top-0 left-0 z-40 h-full bg-gray-100 overflow-y-auto"
                style={{
                    width: `${width}px`,
                    transform: `translateX(${xPosition}px)`,
                    transition: "transform 0.3s ease-in-out",
                }}>
                <nav className="flex flex-col gap-4 p-4 mt-15">
                    <NavLink to="/search"
                        className={({ isActive }) => isActive ? "text-[green] font-bold" : "text-gray-500"}>
                        검색
                    </NavLink>

                    {accessToken && (
                        <NavLink to="/my"
                            className={({ isActive }) => isActive ? "text-[green] font-bold" : "text-gray-500"}>
                            내 페이지
                        </NavLink>
                    )}

                </nav>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black opacity-30 md:hidden"
                    onClick={onClose}>

                </div>)}
        </>
    )
}