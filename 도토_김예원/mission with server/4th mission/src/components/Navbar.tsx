import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getMyInfo } from "../apis/auth";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return; // 비로그인 상태면 호출하지 않음

    const fetchUser = async () => {
      try {
        const res = await getMyInfo();
        setUserName(res.data.name); // ✅ MyPage.tsx와 동일한 구조
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserName(null);
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center px-10 py-4">
      {/* 왼쪽 */}
      <div className="flex items-center gap-4">
        {/* 햄버거 버튼 */}
        <button
  onClick={onToggleSidebar}
  className="block p-2 rounded hover:bg-gray-100 text-gray-700"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M7.95 11.95h32m-32 12h32m-32 12h32"
    />
  </svg>
</button>

        <NavLink to="/" className="text-blue-600 font-bold text-lg">
          Home
        </NavLink>
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-4 text-gray-700">
        {userName ? (
          <>
            <span>{userName}님 반갑습니다.</span>
            <button
              onClick={handleLogout}
              className="hover:text-blue-500 transition"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">로그인</NavLink>
            <NavLink to="/signup">회원가입</NavLink>
          </>
        )}
      </div>
    </div>
  );
};