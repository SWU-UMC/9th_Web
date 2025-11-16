// context >> AuthContex
// 로그인 및 로그아웃 토큰 저장 로직
// useAuth 존재 
import { createContext, useContext, useState, useEffect, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin, deleteUser } from "../apis/auth";
import { getMyProfile } from "../apis/user";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;

  userName: string | null;
  setUserName: (name: string | null) => void;
  withdraw: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  userName: null,
  setUserName: () => {},
  login: async () => {},
  logout: async () => {},
  withdraw: async () => {},
});

export const AuthPovider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // 상태 설정
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage(),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage(),
  );

  const [userName, setUserName] = useState<string | null>(null);

  // 사용자 이름 정보 저장
  useEffect(() => {
  if (!accessToken) return;

  getMyProfile()
    .then((me) => {
      if (me?.data?.name) {
        setUserName(me.data.name);
      }
    })
    .catch(() => {});
}, [accessToken]);

  // 로그인
  const login = async (signinData: RequestSigninDto) => {
    try {
      
      // 구조 분해로 처리하기 
      const { data: userData } = await postSignin(signinData);

      // 데이터가 있다면(로그인을 성공했다면)
      if (userData) {
        const newAccessToken = userData.accessToken;
        const newRefreshToken = userData.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);


        alert("로그인 성공");
        // 네비게이션 훅은 RouterProvider안에서만 사용이 가능하기에 이렇게 처리
        window.location.href = "/me";
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 실패");
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      // 불러올 데이터가 없으므로 그저 로그아웃 함수 실행
      await postLogout();

      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      

      setAccessToken(null);
      setRefreshToken(null);



      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  // ✅ 회원탈퇴
  const withdraw = async () => {
    try {
      await deleteUser();

      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      

      setAccessToken(null);
      setRefreshToken(null);


      alert("회원 탈퇴가 완료되었습니다.");
      window.location.href = "/login";
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      alert("탈퇴 실패. 다시 시도해주세요.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,

        userName,
        setUserName,
        withdraw,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// 훅으로 처리 및 우산이 안 쓰여 졌을 때 처리
// 이거는 hook 폴더에 따로 분류해두는게 더 좋을려나...
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext를 찾을 수 없습니다");
  return context;
};
