// html요소 불러오기
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 타입 선언
type Todo ={
    id: number;
    text: string;
}

// 타입으로 범위를 국한한 배열 선언
// 할일에 들어갈 배열
let todos: Todo[]=[];
// 완료에 들어갈 배열
let doneTasks: Todo[]=[];

// 함수 정의
// 
// 랜더링 전 리스트를 초기화 하고 배열 요소를 각 리스트에 넣는 함수
const renderTask= (): void =>{
    // 빈 문자열로 초기화
    // 리스트를 랜더링 하기 전 초기화 하는 느낌
    todoList.innerHTML ='';
    doneList.innerHTML='';

    todos.forEach((todo): void =>{
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo): void =>{
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

// 사용자 입력 값 텍스트 처리 함수
// trim() : 앞, 뒤 공백을 제거해 새로운 문자열을 반환하는 함수
const getTodoText = (): string => {
    return todoInput.value.trim();
};

//  할 일 추가 함수 _ 할일 배열에 넣고 입력한을 초기화
const addTodo = (text:string): void =>{
    todos.push({id: Date.now(), text});
    // 할 일 입력란을 비우는..
    todoInput.value='';
    renderTask();
}

//  요소 상태 변경 함수_ 할일에서 없애고 완료에 생성
// filler() : 배열의 각 요소에 대해 주어진 조건을 체크하여 결과가 true인 모든
const completeTodo = (todo:Todo): void =>{
    // id가 다른 것들만 할일에 남게 됨.
    todos=todos.filter((t): boolean => t.id !== todo.id);
    // 선택된 todo는 완료로 이동.
    doneTasks.push(todo);
    renderTask();
}

// 완료 영역에서 todo 삭제하는 함수
const deletTodo = (todo: Todo): void =>{
    // 선택이 안된 요소들은 필터를 거쳐 담게됨.
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    renderTask();
}


// ul태그 아이템 생성 함수 ( 완료 여부에 따라 버튼, 색상 설정 )
const createTodoElement =(todo:Todo, isDone: boolean): HTMLLIElement =>{
    const li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent=todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container_item_button');
    
    if(isDone){
        // true 일 때
        button.textContent='삭제';
        button.style.backgroundColor ="#dc3545";
    } else{
        button.textContent='완료';
        button.style.backgroundColor ="#28a745";
    }

    button.addEventListener('click', (): void =>{
        if(isDone){
            deletTodo(todo);
        }
        else{
            completeTodo(todo);
        }
    });

    li.appendChild(button);
    return li;
};

// 폼 제출 관련 이벤트 리스너
// addEventListener()는 타켓의 이벤트가 발생했을 때 실행할 함수 등록.
todoForm.addEventListener('submit', (event: Event): void => {
    // 새로고침을 방지하여 폼 전달이 가능하도록 하는 역할의 함수
    event.preventDefault();
    const text = getTodoText();
    if(text){
        addTodo(text);
    }
});