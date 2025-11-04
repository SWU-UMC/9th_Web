import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
// import { config } from "process";

// Refresh로 accesstoken 발급받는 법 다시 정리하기.
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    // 요청 재시도 여부를 물어보는 플래그
  _retry?: boolean;
}

//  refresh요청의 Promise를 저장해서 중복 요청을 방지.
let refreshPromise:Promise<string>|null =null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터 : 모든 요청 전에 accessToken를 헤더에 추가.
axiosInstance.interceptors.request.use((config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    // const token = getItem();
    const accessToken=getItem();

    // 기존
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    // 존재한다면 Authorization 헤더에 Bearer 토큰 추가
    if(accessToken){
        config.headers=config.headers||{};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }


    // 반환
    return config;
},
(error)=> Promise.reject(error),
);

// 응답 인터셉터 : 401에러 발생 >> refresh 토큰을 활용한 토큰 갱신.
axiosInstance.interceptors.response.use(
    // 정상 응답 그대로 반환
    (response)=>response,
    async(error)=>{
        const originalRequest=error.config;

        // 401에러 이면서 아직 재시도하지 않은 요청의 경우
        if(error.response&&error.response.status===401&&!originalRequest._retry){
            // 아무때나 일어나면 안됨.
            if(originalRequest.url==='v1/auth/refresh'){
                const{removeItem:removeAccessToken}=useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const{removeItem:removeRefreshToken}=useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                removeAccessToken();
                removeRefreshToken();
                window.location.href="/login";
                return Promise.reject(error);
            }
            // 재시도 플레그 설정
            originalRequest._retry=true;

            //이미 리프레시 요청이 진행중이면 그 promise를 재사용
            if(!refreshPromise){
                refreshPromise=(async()=>{
                    const{getItem:getRefreshToken}=useLocalStorage(LOCAL_STORAGE_KEY.refreshToken,

                );
                const refreshToken=getRefreshToken();
                const{data}=await axiosInstance.post('v1/auth/refresh',{
                    refresh:refreshToken,
                });
                // 새 토큰이 반환
                const{setItem:setAccessToken}=useLocalStorage(
                    LOCAL_STORAGE_KEY.accessToken,
                );
                const{setItem:setRefreshToken}=useLocalStorage(
                    LOCAL_STORAGE_KEY.refreshToken,
                );
                setAccessToken(data.data.accessToken);
                setRefreshToken(data.data.refreshToken);

                return data.data.accessToken;
             })()
             .catch((error)=>{
                const{removeItem:removeAccessToken}=useLocalStorage(LOCAL_STORAGE_KEY.accessToken,);
                const{removeItem:removeRefreshToken}=useLocalStorage(LOCAL_STORAGE_KEY.refreshToken,);
                removeAccessToken()
                removeRefreshToken()
             }).finally(()=>{
                refreshPromise=null;

             });
        }
        return refreshPromise.then((newAccessToken)=>{
            originalRequest.headers['Authorization']=`Bearer ${newAccessToken}`;

            return axiosInstance.request(originalRequest);
        });
    }
    return Promise.reject();
},


);