import React from "react"
import type { FormFields } from "../pages/SignupPage";
import { useFormContext } from "react-hook-form";


interface Props {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    onSubmit: (data: FormFields) => void;
}

const SignupStep = ({ step, setStep, onSubmit }: Props) => {
    const { trigger, handleSubmit, formState } = useFormContext<FormFields>();

    const handleNext = async () => {
        let fieldsToValidate: (keyof FormFields)[] = [];
        if (step === 0) fieldsToValidate = ['email'];
        if (step === 1) fieldsToValidate = ['password', 'passwordCheck'];
        if (step === 2) fieldsToValidate = ['name'];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) setStep((prev) => prev + 1);
    };

    return (
        <button
            disabled={formState.isSubmitting}
            type='button'
            onClick={step === 2 ? handleSubmit(onSubmit) : handleNext}
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
            {step === 2 ? "회원가입 종료" : "다음"}
        </button>

    );
};

export default SignupStep;
