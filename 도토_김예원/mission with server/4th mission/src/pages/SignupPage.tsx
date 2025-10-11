import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
// 눈 아이콘
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
// 뒤로 가기 아이콘
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z.string()
        .min(8, {
            message: "비밀번호는 8글자 이상이어야 합니다."
        })
        .max(20, {
            message: "비밀번호는 20글자 이하여야 합니다.",
        }),
    passwordCheck: z.string()
        .min(8, {
            message: "비밀번호는 8글자 이상이어야 합니다."
        }).max(20, {
            message: "비밀번호는 20글자 이하여야 합니다.",
        }),
    name: z.string()
        .min(1, { message: "이름을 입력해주세요." }),
})
    .refine((data) => data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordCheck"],
    });

type FormFields = z.infer<typeof schema>


const SignupPage = () => {
    // 단계별 폼 입력을 위함
    const [step, setStep] = useState(1);
    // 비밀번호 옆 눈 아이콘을 위함
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    // 이전 화면으로( 홈화면 )으로 이동하기 위한 navigate 추가
    const navigate = useNavigate();

    const { register, handleSubmit, trigger, getValues, formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    // 회원가입 하고 응답 받기
    const OnSubmit: SubmitHandler<FormFields> = async (data) => {
        const { passwordCheck, ...rest } = data;
        const response = await postSignup(rest);
        console.log(response);
        // 홈으로 이동
        navigate("/");
    }

    const handleNext = async () => {
        if (step === 1) {
            const valid = await trigger("email");
            if (valid) setStep(2);
        } else if (step === 2) {
            const valid = await trigger(["password", "passwordCheck"]);
            if (valid) setStep(3);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3 w-[300px]">
                <div className="relative flex items-center justify-center py-2">
                    <button
                        onClick={() => navigate("/")}
                        className="absolute left-1 flex items-center text-gray-500 hover:text-gray-900"
                    >
                        <IoIosArrowBack className="w-5 h-6" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-500">회원가입</h1>
                </div>

                {/* 이메일 */}
                <div>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="이메일"
                        className={`border w-full p-[10px] rounded-sm ${errors.email ? "border-red-500 bg-red-100" : "border-gray-300"
                            }`}
                        disabled={step > 1} // 다음 단계로 넘어가면 수정 불가
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                {/* 비밀번호 단계 */}
                {step >= 2 && (
                    <>
                        {/* 눈 아이콘을 위해 전체 감싸주기 */}
                        <div className="relative">
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="비밀번호"
                                className={`border w-full p-[10px] rounded-sm ${errors.password ? "border-red-500 bg-red-100" : "border-gray-300"
                                    }`}
                                disabled={step > 2}
                            />
                            {/* 눈 아이콘 */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ?<VscEye style={{ color: "#000", fontSize: "22px" }} />  :  <VscEyeClosed style={{ color: "#000", fontSize: "22px" }} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}

                        <div className="relative">
                            <input
                                {...register("passwordCheck")}
                                type={showPasswordCheck ? "text" : "password"}
                                placeholder="비밀번호 확인"
                                className={`border w-full p-[10px] rounded-sm ${errors.passwordCheck
                                    ? "border-red-500 bg-red-100"
                                    : "border-gray-300"
                                    }`}
                                disabled={step > 2}
                            />
                            {/* 눈 아이콘 */}
                            <button
                                type="button"
                                onClick={() => setShowPasswordCheck((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPasswordCheck ?<VscEye style={{ color: "#000", fontSize: "22px" }} />  :  <VscEyeClosed style={{ color: "#000", fontSize: "22px" }} />}
                            </button>
                        </div>
                        {errors.passwordCheck && (
                            <p className="text-red-500 text-sm">
                                {errors.passwordCheck.message}
                            </p>
                        )}
                    </>
                )}

                {/* 사용자 이름*/}
                {step >= 3 && (
                    <div>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="이름"
                            className={`border w-full p-[10px] rounded-sm ${errors.name ? "border-red-500 bg-red-100" : "border-gray-300"
                                }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>
                )}

                {/* 버튼 */}
                {/* 이름 단계 이전 */}
                {step < 3 ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                            (step === 1 &&
                                (!!errors.email || !getValues("email"))) ||
                            (step === 2 &&
                                (!!errors.password ||
                                    !!errors.passwordCheck ||
                                    !getValues("password") ||
                                    !getValues("passwordCheck")))
                        }
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium 
                       hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                    >
                        다음
                    </button>
                ) : (
                    // 이름까지 유효성에 맞게 작성하면 다음이 아닌 회원가입으로 나타나도록
                    <button
                        type="button"
                        onClick={handleSubmit(OnSubmit)}
                        disabled={!!errors.name || !getValues("name") || isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium 
                       hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                    >
                        회원가입
                    </button>
                )}
            </div>
        </div>
    );
};

export default SignupPage;