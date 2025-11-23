import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../apis/auth";
import { WithdrawModal } from "./WithdrawModal";

interface SidebarProps {
    width?: number;
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ width = 280, isOpen, onClose }: SidebarProps) => {
    const { accessToken } = useAuth();
    const xPosition = isOpen ? 0 : -width;

    // 탈퇴 모달 관리
    const [isModalOpen, setIseModalOpen] = useState(false);

    const navigate = useNavigate();

    const withdrawMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: (data) => {
            console.log("회원 탈퇴 성공", data);
            alert("회원 탈퇴 완료");
            navigate("/login");
        },
        onError: (error) => {
            console.error("회원 탈퇴 실패", error);
            alert("회원 탈퇴 실패");
        },
    });

    // 모달 확인 버튼
    const handleConfirmWithdraw = () => {
        withdrawMutation.mutate();
    };

    // 모달 취소 버튼   
    const handleCancelWithdraw = () => {
        setIseModalOpen(false);
    };

    //ESC 키로 닫기
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (isOpen && e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscKey);
        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen, onClose]);

    // 배경 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // 스크롤 막기
        } else {
            document.body.style.overflow = "unset"; // 스크롤 복구
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <div className="flex flex-col fixed top-0 left-0 z-40 h-full bg-gray-100 overflow-y-auto
            transform transition-transform duration-300 ease-in-out"
                style={{
                    width: `${width}px`,
                    transform: `translateX(${xPosition}px)`,
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
                {accessToken && (
                    <div className="p-4 mt-auto mx-auto">
                        <button className="cursor-pointer text-gray-500"
                            onClick={() => setIseModalOpen(true)}
                            disabled={withdrawMutation.isPending}>탈퇴하기</button>
                    </div>

                )}
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black opacity-30 md:hidden"
                    onClick={onClose} />
            )}

            {isModalOpen && (
                <WithdrawModal
                    onConfirm={handleConfirmWithdraw}
                    onCancel={handleCancelWithdraw} />
            )}
        </>
    );
};