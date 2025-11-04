import { Outlet, useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";


const HomeLayout = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("클릭됨");
        navigate("/");
    };

    return (
        <div className="h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1 mt-10 pt-10 md:ml-[150px]">
                <Outlet />
            </main>
            <div className="md:ml-[150px]">
                <Footer />
            </div>
            <FloatingButton onClick={handleClick}/>
        </div>
    );
};

export default HomeLayout;
