import { useState,useRef, useEffect } from "react";

// throttle hook
function useThrottle<T>(value:T,delay:number=500){
    //  쓰로틀링된 최종 값을 저장하는 state
    //  외부에서 빠르게 value가 바뀌어도 state는 delay 시간에 맞춰 변경
    const [throttledValue,setThrottledValue]= useState<T>(value);

    // 마지막으로 업데이트 된 시간 기억
    const lastExecuted= useRef<number>(Date.now());

    // 값이 새로 들어올 떄마다 스로틀링 체크
    useEffect(()=>{
        // 충분한 시간이 지난 경우 바로 실행
        if(Date.now()>=lastExecuted.current+delay){
            //  시간 업데이트 및 스크롤 값 업데이트
            lastExecuted.current=Date.now();
            setThrottledValue(value);
        // 아직 delay가 지나지 않은 경우
        }else{
            // delay 이후 마지막 value로 업데이트 
            // 예약 실행 느낌
            const timerld=setTimeout(()=>{
                lastExecuted.current=Date.now();
                setThrottledValue(value);
            },delay);

            // value가 변경되면 기존꺼 지움.
            return ()=>clearTimeout(timerld);
        }
    },[value,delay]);

    return throttledValue;
}
export default useThrottle;