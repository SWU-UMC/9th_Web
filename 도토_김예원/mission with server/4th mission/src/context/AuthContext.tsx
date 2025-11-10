import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin, deleteUser } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  setUserName: (name: string | null) => void;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
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

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage(),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage(),
  );
  const [userName, setUserName] = useState<string | null>(null);

  // ✅ 로그인
  const login = async (signinData: RequestSigninDto) => {
    try {
      const response = await postSignin(signinData); // 전체 응답
      const userData = response.data; // ✅ 내부 data 추출

      if (userData) {
        const newAccessToken = userData.accessToken;
        const newRefreshToken = userData.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        setUserName(userData.name || "익명"); // ✅ 닉네임 저장

        alert("로그인 성공!");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 실패");
    }
  };

  // ✅ 로그아웃
  const logout = async () => {
    try {
      await postLogout();

      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);
      setUserName(null);

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
      setUserName(null);

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
        userName,
        setUserName,
        login,
        logout,
        withdraw,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext를 찾을 수 없습니다");
  return context;
};
