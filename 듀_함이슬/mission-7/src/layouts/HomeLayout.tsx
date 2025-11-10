import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";
import LpAdd from "../components/LpCard/LpAdd";
import { useState } from "react";


const HomeLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1 mt-10 pt-10 md:ml-[150px]">
                <Outlet />
            </main>
            <div className="md:ml-[150px]">
                <Footer />
            </div>
            <FloatingButton onClick={() => setIsModalOpen(true)}/>
            <LpAdd isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default HomeLayout;
