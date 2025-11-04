import { validateSignin, type UserSigninInformation } from "../utils/validate";
import useForm from "../hooks/useForm";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { LOCAL_STORAGE_KEY } from "../constants/key";
// import { postSignin } from "../apis/auth";
import { useNavigate } from "react-router-dom";
// 뒤로가기 아이콘 추가
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
// import { useEffect } from "react";

const LoginPage = () => {
    // 이전 화면으로( 홈화면 )으로 이동하기 위한 navigate 추가
    const navigate = useNavigate();
    // 전역 처리
    const{login}=useAuth();

    // useEffect(()=>{
    //     if(accessToken){
    //         navigate("/")
    //     }
    // },[navigate,accessToken]);

    // const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    // 로그인 api호출 + 에러 처리 + 로컬스토리지에 저장
    const handleSubmit = async () => {
        await login(values);
        navigate("/my");
        
        // 전역으로 처리
        // try {
        //     const response = await postSignin(values);
        //     setItem(response.data.accessToken);
        //     console.log("로그인 성공:", response);
        //     navigate("/my");
        // } catch (error: any) {
        //     console.error(error);
        //     alert(error?.message || "로그인 중 오류가 발생했습니다.");
        // }
    };

    const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) ||
        Object.values(values).some((value) => value === "");

    // 구글 로그인
    const handleGoogleLogin=()=>{
        // 왜 위에는 실행이 안되고 밑에는 실행이 된걸까
        // window.location.href=import.meta.env.VITE_SERVER_API_URL+"/v1/auth/google/login?prompt=select_account";
        window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/google/login?prompt=select_account`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <div className="relative flex items-center justify-center py-2">
                    <button
                        onClick={() => navigate("/")}
                        className="absolute left-1 flex items-center text-gray-500 hover:text-gray-900"
                    >
                        <IoIosArrowBack className="w-5 h-6" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-500">로그인</h1>
                </div>

                <input
                    {...getInputProps("email")}
                    name="email"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-blue-600 rounded-sm 
                    ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={"email"}
                    placeholder={"이메일"} />

                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}

                <input
                    {...getInputProps("password")}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={"password"}
                    placeholder={"비밀번호"} />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}

                <button type='button' onClick={handleSubmit} disabled={isDisabled}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium 
                    hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
                    로그인
                </button>
                <button type='button' onClick={handleGoogleLogin}
                    className="w-full bg-gray-100 text-black py-3 rounded-md text-lg font-medium 
                    hover:bg-gray-300 transition-colors cursor-pointer">
                        <div className="flex item-center justify-center gap-2">
                            <img src={"images/geogle.png"} alt="구글 로고" className="w-8 h-auto"/>
                            <span>구글 로그인</span>
                        </div>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;