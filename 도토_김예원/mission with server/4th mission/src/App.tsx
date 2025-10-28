import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomeLayout from './layout/HomeLayout'
import SignupPage from './pages/SignupPage'
import Mypage from './pages/MyPage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // 부모와 경로가 같은 경우 index:true;로 표시 하기도 함.
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'my', element: <Mypage /> },
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}
      />
    </>
  )
}

export default App
