import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomeLayout from './layout/HomeLayout'
import SignupPage from './pages/SignupPage'
import Mypage from './pages/MyPage'
import { AuthPovider } from './context/AuthContext'
import ProtectedLayout from './layout/ProtectedLayout'
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage'

// 인증 없이 접근 가능한 라우트
const publicRoutes=[
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // 부모와 경로가 같은 경우 index:true;로 표시 하기도 함.
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      {path:'v1/auth/google/callback',element:<GoogleLoginRedirectPage/>}
    ],
  },
];

// 인증이 필요한 라우트
const protectedRoutes=[
  {
    path:"/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children:[
      {
      path:"my",
      element:<Mypage/>,
      }
    ],
  },
];


const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <HomeLayout />,
  //   errorElement: <NotFoundPage />,
  //   children: [
  //     { index: true, element: <HomePage /> },
  //     { path: 'login', element: <LoginPage /> },
  //     { path: 'signup', element: <SignupPage /> },
  //     { path: 'my', element: <Mypage /> },
  //   ]
  // }
  ...publicRoutes,
  ...protectedRoutes,
]);

function App() {
  return (
    <>
    <AuthPovider>
      <RouterProvider router={router}
      />
    </AuthPovider>
    </>
  )
}

export default App
