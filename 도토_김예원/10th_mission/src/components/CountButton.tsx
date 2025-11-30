import { memo } from "react";
interface ICountButton {
    onclick: (count: number)=> void;
}

const CountButton= ({onclick}: ICountButton)=>{
    console.log('CountButton rendered');

    return(
        <button className="border p-2 rounded-lg" onClick={()=>onclick(10)}>
            카운트 증가
        </button>
    );
};

export default memo(CountButton);