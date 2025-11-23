import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { useSidebar } from "../hooks/useSidebar";
import { useLocation } from "react-router-dom";

// 토큰이 없는 경우를 처리해주는 레이아웃 
const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;  // ← 현재 페이지 경로

  // 훅으로 처리
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isOpen, toggle, close } = useSidebar();

  // esc를 누르면 햄버거 슬라이더가 꺼지도록
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, close]);

  // 슬라이더가 열려있을 때 배경 스크롤이 안되도록
  useEffect(() => {
    if (isOpen) {
      // hidden : 요소의 스크롤를 완전히 막는다
      document.body.style.overflow = "hidden";
    } else {
      // unset : 요소의 기본값으로 되돌린다 = 여기선 스크롤이 되도록
      document.body.style.overflow = "unset";
    }

    // 혹시 잠겨 있으면 풀리기 위한 안전장치 
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 토큰이 없는 경우 로그인 페이지 연결 이전 경고창 보이기
  // 현재 2번이 보이는건 개발자 모드여서 그럼
  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
    }
  }, [accessToken]);

  // 토큰이 없는 경우 로그인 페이지로 연결
  if (!accessToken) {
    return <Navigate to={"/login"} replace state={{ from: pathname }} />;
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
        <Navbar onToggleSidebar={toggle} />
      </header>

      {/* Layout */}
      <div className="flex flex-1 pt-16 transition-all duration-300">

        {/* Sidebar*/}
        <Sidebar isOpen={isOpen} />

        <main className="flex-1 overflow-y-auto bg-white z-20" onClick={close}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;