import { memo } from "react";

interface ITextInput {
    onchange: (text: string)=> void;
}

const TextInput= ({onchange}: ITextInput)=>{
    console.log('TextInput rendered');

    return(
        <input
        type="text"
        className="border p-4 rounded-lg"
        onChange={(e)=>onchange(e.target.value)}>
        </input>
    );
};

export default memo(TextInput);