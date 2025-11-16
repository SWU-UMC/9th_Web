import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";

// 토큰이 없는 경우를 처리해주는 레이아웃 
const ProtectedLayout=()=>{
    const {accessToken}=useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // 토큰이 없는 경우 로그인 페이지로 연결
    if(!accessToken){
        return<Navigate to={"/login"} replace/>;
    }

    return (
    <div className="flex h-screen bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      </header>

      {/* Layout */}
      <div className="flex flex-1 pt-16 transition-all duration-300">

        {/* Sidebar*/}
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-white z-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;