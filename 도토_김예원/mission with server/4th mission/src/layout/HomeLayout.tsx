import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";

const HomeLayout = () => {
  // 햄버거 영역 보이고 안보이고
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      </header>

      {/* Layout */}
      <div className="flex flex-1 pt-16 transition-all duration-300">

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* 콘텐츠 */}
        <main className="flex-1 overflow-y-auto bg-white z-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;