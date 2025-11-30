import { useMemo, useState } from "react"
import TextInput from "../components/TextInput";
import { findPrimeNumbers } from "../untils/math";

function  UseMemoPage() {
    // Number("")되어 있으면 NaN이 반환되는데 이는 <number>로 선언된 limit에서 거부되어 앞에 자동으로 0생성
    // 그래서 입력값은 문자열로 관리하고, 형변환을 따로 
    const [limitStr, setLimitStr] = useState('0');
    // 여기가 형변환 하는곳
    const limit = Number(limitStr);
    const[text, setText]= useState('');

    const handleChangeText=(text: string)=>{
        setText(text);
    }

    const primes= useMemo(():number[]=>findPrimeNumbers(limit),[limit]) ;

    return(
        <div className="flex flex-col gap-4 h-dhv">
            <h1>같이 배우는 리액트 useMemo편</h1>
            <label>
                숫자 입력 (소수 찾기):
                <input
                type="number"
                value={limitStr}
                className="border p-4 rounded-lg"
                onChange={(e)=>setLimitStr(e.target.value)}
                />
            </label>

            {/* 배열 돌면서 출력 */}
            <h2>소수 리스트:</h2>
            <div className="flex flex-warp">
                {primes.map((prime)=>(
                    <div key={prime}>{prime}&nbsp;</div>
                ))}
            </div>

            <label>
                {text}
                다른 입력 테스트 : <TextInput onchange={handleChangeText}/>
            </label>
        </div>
    )

}
export default UseMemoPage