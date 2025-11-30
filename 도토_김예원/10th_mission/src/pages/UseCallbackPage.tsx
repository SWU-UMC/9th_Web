import { useState, useCallback } from "react"
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";


function UseCallBackPage() {
    const [count, setCount] = useState<number>(0);
    const [text, setText] = useState<string>('');

    const handleIncreaseCount = useCallback((number: number) => {
        setCount(count + number);
        // 의존성 배열 추가
    },[count]);

    const handleText = useCallback((text: string) => {
        setText(text);
    },[]);

    return (
        <div className="item-start">
            <h1>같이 배우는 리액트 useCallback편</h1>
            <h2>Count : {count}</h2>
            <CountButton onclick={handleIncreaseCount} />
            <h2>Text :</h2>
            <div className="flex flex-col">
                <span>{text}</span>
                <TextInput onchange={handleText} />
            </div>
        </div>
    )
}

export default UseCallBackPage