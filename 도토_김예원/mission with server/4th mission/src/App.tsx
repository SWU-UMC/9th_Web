import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layout/HomeLayout";
import SignupPage from "./pages/SignupPage";
import Mypage from "./pages/MyPage";
import { AuthPovider } from "./context/AuthContext";
import ProtectedLayout from "./layout/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import LpDetailPage from "./pages/LpDetailPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    // ✅ 최상단 한 번만 HomeLayout
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },

      // ✅ 보호 라우트는 HomeLayout 안에서만 작동하도록 함
      {
        element: <ProtectedLayout />, // Navbar 포함 X
        children: [
          { path: "my", element: <Mypage /> },
          { path: "lp/:lpid", element: <LpDetailPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthPovider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthPovider>
  );
}

export default App;