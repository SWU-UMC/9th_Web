import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
    // 로컬스토리지에 토큰 저장
    const { setItem: setAccessToken } = useLocalStorage(
        LOCAL_STORAGE_KEY.accessToken,
    );
    const { setItem: setRefreshToken } = useLocalStorage(
        LOCAL_STORAGE_KEY.refreshToken,
    );

    useEffect(() => {
        // 현재 주소를 불러옴.
        const urlParams = new URLSearchParams(window.location.search);
        // 주소에 있는 값들을 가져옴 >> get()활용
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);


        // 토큰이 있는경우 즉 로그인을 성공한 경우 
        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            
            window.location.href = "/my";
        }
    }, [setAccessToken, setRefreshToken,]);

    return (
        <div>
            구글 로그인 리다이렉 화면
        </div>
    );
}

export default GoogleLoginRedirectPage;