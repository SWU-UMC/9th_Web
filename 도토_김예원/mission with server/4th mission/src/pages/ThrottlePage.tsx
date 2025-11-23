import { useEffect, useState } from "react"
import useThrottle from "../hooks/useThrottle";

// Throttle 실습을 위한 페이지
const ThrottlePage=()=>{
    const [srollY,setSrollY]=useState<number>(0);

    // state 값 변경
    // React는 setState가 실행되면 컴포넌트를 다시 렌더링
    // 
    //  useThrottle hook 적용
    const handleScroll=useThrottle(
        ()=>{
        setSrollY(window.scrollY);
    },2000);

    // handleScroll이 바뀌면 useEffect는 재실행됨
    useEffect(()=>{
        // scroll 이벤트가 발생하면 handleScroll 호출
        window.addEventListener("scroll",handleScroll);

        // useEffect가 끝날 떄 등록한 scroll 이벤트 제거
        return()=> window.removeEventListener("scroll",handleScroll);
    },[handleScroll]);

    console.log("리렌더링");

    return(
        <div className="min-h-[300vh] flex flex-col items-center justify-center">
            <div>
                <h1>쓰로틀링이 무엇일까요?</h1>
                <span>ScrollY:{srollY}px</span>
            </div>
        </div>

    );
};

export default ThrottlePage;