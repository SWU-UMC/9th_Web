import { validateSignin, type UserSigninInformation } from "../utils/validate";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  // 로그인이 된 상태일 떄 accessToken이 있는 상태에서 로그인 페이지로 말고 홈으로 연결되도록
  // uesEffect 사용


  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  // ✅ useMutation으로 로그인 처리
  const loginMutation = useMutation({
    mutationFn: async () => await login(values),
    onSuccess: () => {
      alert("로그인 성공!");
      navigate("/my");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호를 확인해주세요.");
    },
  });

  const handleSubmit = async () => {
    loginMutation.mutate();
  };

  // 기존 직접 처리 코드 (주석으로 보관)
  // const handleSubmit = async () => {
  //   await login(values);
  //   navigate("/my");
  // };
  

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  // 구글 로그인 함수
  const handleGoogleLogin = () => {
    // 정확한 내용을 위해 확인하는 습관 기르기
    console.log(import.meta.env.VITE_SERVER_API_URL);

    window.location.href =
      import.meta.env.VITE_SERVER_API_URL
    +"/v1/auth/google/login?prompt=select_account";
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
          className={`border w-[300px] p-[10px] rounded-sm focus:border-blue-600 
          ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
          ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled || loginMutation.isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300"
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-gray-100 text-black py-3 rounded-md text-lg font-medium hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <div className="flex item-center justify-center gap-2">
            <img src={"images/geogle.png"} alt="구글 로고" className="w-8 h-auto" />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;