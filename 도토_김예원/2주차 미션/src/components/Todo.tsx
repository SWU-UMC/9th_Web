import { useContext, useState, type FormEvent } from "react"
import type { TTodo } from "../types/todo"
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { TodoContext, useTodo } from "../context/TodoContext";

const Todo = () => {
    // const [todos, setTodos] = useState<TTodo[]>([]);
    // const [doneTodos, setDoneTodos]= useState<TTodo[]>([]);
    // const [input, setInput]= useState<string>('');
    
    // context 불러오기
    // const context = useTodo();
    const{todos,completeTodo, deleteTodo, doneTodos}=useTodo();
    
    
    // const handleSubmit =(e: FormEvent<HTMLFormElement>) :void =>{
    //     e.preventDefault();
    //     const text = input.trim();
    
    //         if(text){
    //             // addTodo자리
    //             // 원본
    //             // const newTodo:TTodo ={id:Date.now(),text};
    //             // setTodos((prevTodos):TTodo[]=>[...prevTodos, newTodo]);
    //             addTodo(text);
    //             setInput('');
    //         }
    // };
    
        // const completeTodo = (todo:TTodo):void =>{
        //     setTodos((prevTodos): TTodo[]=>prevTodos.filter((t):boolean => t.id
        //     !== todo.id));
    
        //     setDoneTodos((prevDoneTodos): TTodo[]=>[...prevDoneTodos, todo]);
        // };
    
        // const deleteTodo = (todo:TTodo):void =>{
        //     setDoneTodos((prevDoneTodos): TTodo[]=>prevDoneTodos.filter((t):boolean => t.id
        //     !== todo.id));
        // };

    return (
    <div className="todo-container">
        <h1 className="todo-container__header">YOUG TODO</h1>
        <TodoForm />
        <div className="render-container">
            <TodoList 
                title="할 일" 
                todos={todos} 
                buttonLabel="완료"
                buttonColor="#28a745"
                onClick={completeTodo}
            />
            <TodoList 
                title="완료" 
                todos={doneTodos} 
                buttonLabel="삭제"
                buttonColor="#dc3545"
                onClick={deleteTodo}
            />
        </div>
    </div>
    );
  
};

export default Todo;