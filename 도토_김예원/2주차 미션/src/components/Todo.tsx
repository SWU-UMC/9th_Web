import { useState, type FormEvent } from "react"
import type { TTodo } from "../types/todo"

const Todo =()=> {
    const [todos, setTodos] = useState<TTodo[]>([
        // 테스트를 위한 객체 
        // {
        //     id: 1,
        //     text: "맛있다",
        // },
        // {
        //     id: 2,
        //     text: "졸리다",
        // },
    ]);
    const [doneTodos, setDoneTodos]= useState<TTodo[]>([
        // {
        //     id: 1,
        //     text: "오타니",
        // }
    ]);
    const [input, setInput]= useState<string>('');

    const handleSubmit =(e: FormEvent<HTMLFormElement>) :void =>{
        e.preventDefault();
        
        const text = input.trim();

        if(text){
            const newTodo:TTodo ={id:Date.now(),text};
            setTodos((prevTodos):TTodo[]=>[...prevTodos, newTodo]);
            setInput('');
        }
    };

    const completeTodo = (todo:TTodo):void =>{
        setTodos((prevTodos): TTodo[]=>prevTodos.filter((t):boolean => t.id
        !== todo.id));

        setDoneTodos((prevDoneTodos): TTodo[]=>[...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo:TTodo):void =>{
        setDoneTodos((prevDoneTodos): TTodo[]=>prevDoneTodos.filter((t):boolean => t.id
        !== todo.id));
    };

    return(
        <div className="todo-container">
            <h1 className="todo-container__header">YOUG TODO</h1>
            <form onSubmit={handleSubmit}
            className="todo-container__form">
                <input value={input} onChange={(e):void =>setInput(e.target.value)}
                 type="text" className="todo-container__input" placeholder="할 일 입력" required/>
                <button type="submit" className="todo-container__button">
                    할 일 추가
                </button>
            </form>
            <div className="render-container">
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id="todo-list" className="render-container__list">
                        {/* 이 부분을 usestate를 활용하여 처리 */}
                        {/* <li className="render-container__item">
                            <span className="render-container__item-text">고구마</span>
                            <button style={{backgroundColor: '#28a745'}}
                            className="render-container__item-button">완료</button>
                        </li> */}
                        {todos.map((todo): any=>(
                            <li key={todo.id} className="render-container__item">
                            <span className="render-container__item-text">{todo.text}</span>
                            <button style={{backgroundColor: '#28a745'}}
                            className="render-container__item-button"
                            onClick={():void=>completeTodo(todo)}>완료</button>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="render-container__section">
                    <h2 className="render-container__title">완료</h2>
                    <ul id="todo-list" className="render-container__list">
                        {/* <li className="render-container__item">
                            <span className="render-container__item-text">고구마</span>
                            <button style={{backgroundColor: '#dc3545'}}
                            className="render-container__item-button">완료</button>
                        </li> */}
                        {doneTodos.map((todo): any=>(
                            <li key={todo.id} className="render-container__item">
                            <span className="render-container__item-text">{todo.text}</span>
                            <button style={{backgroundColor: '#dc3545'}}
                            className="render-container__item-button"
                            onClick={():void=>deleteTodo(todo)}
                            >삭제</button>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Todo
