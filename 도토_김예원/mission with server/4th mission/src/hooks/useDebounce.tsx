// debounce 처리 hooks

import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number){
    const[debouncedValue,setdebouncedValue]= useState<T>(value);

    // value와 delay가 변경될 때마다 실행
    useEffect(()=>{
        // delay시간 이후 value(입력값)을 debouncedValue로 업데이트
        const handler=setTimeout(()=>setdebouncedValue(value),delay);

        // 입력값이 있으면 업데이트 하는 함수를 초기화 해줌
        return ()=>clearTimeout(handler);
    },[value,delay]);

    return debouncedValue;
}

export default useDebounce;