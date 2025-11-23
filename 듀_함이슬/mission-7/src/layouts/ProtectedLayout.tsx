import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";
import LpAdd from "../components/LpCard/LpAdd";
import { useState } from "react";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!accessToken) {
        return <Navigate to={"/login"} replace />;
    }

    return (
        <div className="h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1 pt-10 mt-10 md:ml-[150px]">
                <Outlet />
            </main>
            <Footer />
            <FloatingButton onClick={() => setIsModalOpen(true)} />
            <LpAdd isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </div>
    );
};

export default ProtectedLayout;
