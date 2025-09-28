import { ThemeProvider } from "../context/ThemeProvider";
import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";

export default function ContextPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* 우산으로 덮어주기 */}
            <ThemeProvider>
                <Navbar/>
                <main className="flex-1 w-full">
                    <ThemeContent/>
                </main>
            </ThemeProvider>
        </div>
    );
}