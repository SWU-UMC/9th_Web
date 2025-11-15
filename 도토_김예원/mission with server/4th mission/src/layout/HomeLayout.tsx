import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* ✅ Navbar 고정 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
        <Navbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      </header>

      {/* ✅ Navbar 높이만큼 여백 */}
      <div className="flex flex-1 pt-16 transition-all duration-300">
        {/* ✅ 사이드바 (layout 내 포함) */}
        <aside
          className={`bg-gray-100 border-r border-gray-300 transition-all duration-300
            ${isSidebarOpen ? "w-60" : "w-0"}
            overflow-hidden z-40`}
        >
          <ul className="flex flex-col gap-3 p-4 text-gray-700 font-medium">
            <li>홈</li>
            <li>마이페이지</li>
          </ul>
        </aside>

        {/* ✅ 메인 콘텐츠 (자동으로 남은 공간 차지) */}
        <main className="flex-1 overflow-y-auto bg-white z-20 relative transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;