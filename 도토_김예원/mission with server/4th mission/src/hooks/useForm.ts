import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
    initialValue: T;
    //  값이 올바른지 검증
    validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string,string>>();

    // 사용자가 입력값을 바꿀 때 실행되는 함수
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values,
            [name]: text,
        });
    };

    const handleBlur =(name: keyof T)=>{
        setTouched(
            {...touched,
                [name]:true,
            }
        );
    }

    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => handleChange(name, e.target.value);
        const onBlur=()=> handleBlur(name);
        return{value,onChange, onBlur };
    };

    // 사용자가 값을 입력할 때마다 validate()가 실행되어 error 상태 자동 업데이트
    useEffect(()=>{
        const newErrors=validate(values);
        setErrors(newErrors);
    },[validate, values]);

    return{values, errors, touched, getInputProps};
}

export default useForm;