import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 토큰이 없는 경우를 처리해주는 레이아웃 
const ProtectedLayout=()=>{
    const {accessToken}=useAuth();

    // 토큰이 없는 경우 로그인 페이지로 연결
    if(!accessToken){
        return<Navigate to={"/login"} replace/>;
    }

    return(
        <div className="h-dvh flex flex-col">
            <main className="flex-1">
                <Outlet/>
            </main>
        </div>
        
    );
};

export default ProtectedLayout;