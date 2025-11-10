import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import SignupStep from "../components/SignupStep";

const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z.string()
        .min(8, {
            message: "비밀번호는 8자 이상이어야 합니다."
        }).max(20, {
            message: "비밀번호는 20자 이하여야 합니다.",
        }),
    passwordCheck: z.string()
        .min(8, {
            message: "비밀번호는 8자 이상이어야 합니다."
        }).max(20, {
            message: "비밀번호는 20자 이하여야 합니다.",
        }),
    name: z.string()
        .min(1, { message: "이름을 입력해주세요." }),
})
    .refine((data) => data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ['passwordCheck'],
    });

export type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const methods = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const { 
        register,
        getValues, //이메일 표시용
        formState: { errors } } = methods;

    //마지막 단계에서 회원가입 요청
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordCheck, ...rest } = data;

        try {
            const response = await postSignup(rest);
            console.log(response);

            navigate("/");
        } catch (error) {
            console.error("회원가입 실패:", error);
        }
    };

    //비밀번호 보기 토글
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);


    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">

                <div className="relative w-full">
                    <button onClick={() => navigate(-1)}
                        className="absolute left-0 text-2xl text-gray-300 hover:text-green-900"> &lt; </button>
                    <h1 className="text-center text-2xl">회원가입</h1>
                </div>

                {step === 0 && (
                    <>
                        <input
                            {...register("email")}
                            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                                    ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                            type={"email"}
                            placeholder={"이메일"}
                        />
                        {errors.email && (
                            <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
                        )}
                    </>
                )}

                {step === 1 && (
                    <>
                        <p className="text-gray-500 text-sm">
                            ✉️ {getValues("email")}
                        </p>

                        {/* 비밀번호 입력 */}
                        <div className="relative w-[300px]">
                            <input
                                {...register("password")}
                                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                                    ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                                type={showPassword ? "text" : "password"}
                                placeholder={"비밀번호"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && (
                            <div className={"text-red-500 text-sm"}>{errors.password.message}</div>
                        )}

                        {/* 비밀번호 확인    */}
                        <div className="relative w-[300px]">
                            <input
                                {...register("passwordCheck")}
                                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                                    ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                                type={showPasswordCheck ? "text" : "password"}
                                placeholder={"비밀번호 확인"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordCheck(prev => !prev)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                {showPasswordCheck ? "🙈" : "👁️"}
                            </button></div>
                        {errors.passwordCheck && (
                            <div className={"text-red-500 text-sm"}>{errors.passwordCheck.message}</div>
                        )}
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            {...register("name")}
                            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                                    ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                            type={"name"}
                            placeholder={"이름"}
                        />
                        {errors.name && (
                            <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
                        )}
                    </>
                )}
                <FormProvider {...methods}>
                    <SignupStep
                        step={step}
                        setStep={setStep}
                        onSubmit={onSubmit} />
                </FormProvider>

            </div>
        </div>
    );
};

export default SignupPage;
