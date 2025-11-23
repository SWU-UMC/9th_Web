import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layout/HomeLayout";
import SignupPage from "./pages/SignupPage";
import Mypage from "./pages/MyPage";
import { AuthPovider } from "./context/AuthContext";
import ProtectedLayout from "./layout/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import LpDetailPage from "./pages/LpDetailPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ThrottlePage from "./pages/ThrottlePage";
import ErrorPage from "./pages/ErrorPage";

const queryClient = new QueryClient();


// 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      // 구글 로그인 리다이렉 주소
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
      { path: "throttle", element: <ThrottlePage/>},
    ],
  },
];

// 인증이 필요한(토큰 검사) 라우트
// 토큰 검사 후 페이지 연결은 레이아웃에 로직 구현
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "my", element: <Mypage /> },
      { path: "lp/:lpid", element: <LpDetailPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes,...protectedRoutes]);

function App() {
  return (
    <AuthPovider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.DEV&&<ReactQueryDevtools/>}
      </QueryClientProvider>
    </AuthPovider>
  );
}

export default App;