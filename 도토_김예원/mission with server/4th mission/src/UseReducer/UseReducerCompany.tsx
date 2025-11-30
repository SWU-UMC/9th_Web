import { useReducer, useState, type ChangeEvent } from "react";

type TActionType ='CHANGE_DEPARTMENT'| 'RESET';

interface IState {
    department:string;
    error: string | null;
}

interface IAction {
    type: TActionType;
    payload?:string;
}

function reducer(state:IState, action: IAction){
    const {type,payload}= action;

    switch(type) {
        case "CHANGE_DEPARTMENT": {
            const newDepartment = payload;
            const hasError = newDepartment !== '카드메이커';
            return{
            ...state,
            department : hasError ? state.department : newDepartment,
            error : hasError
            ? '거부권 행사 가능, 카드메이커만 입력 가능합니다'
            :null,
        };
        }
        default:
            return state;
    }
}

export default function UseReducerCompany(){
    const[state,dispatch]= useReducer(reducer,{
        department: 'Software Developer',
        error: null,
    });

    const [department,setDepartment]= useState('');
    const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>)=>{
        setDepartment(e.target.value);
    };

    return(
        <div className="flex flex-col justify-center items-center gap-6 py-20">
            <h1 className="text-2xl font-bold text-gray-800">{state.department}</h1>
            {state.error&& <p className="text-red-500 text-md font-semibold">{state.error}</p>} 

            <input
            className='w-[500px] border border-gray-400 p-4 rounded-md shadow-sm'
            placeholder="변경하시고 싶은 직무를 입력해주세요."
            value={department}
            onChange={handleChangeDepartment}
            />
            
            <button
            className="w-[500px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-sm transition"
            onClick={()=>
                dispatch({type:'CHANGE_DEPARTMENT', payload: department})
            }>
                직무 변경하기
            </button>
        </div>
    )
}