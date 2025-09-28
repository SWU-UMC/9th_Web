import './App.css'
import Todo from './components/Todo';
import { TodoProvider } from './context/TodoContext.tsx';

function App(){
  return(
    <>
    {/* 2주차 미션 01 */}
    <TodoProvider>
      <Todo/>
    </TodoProvider>

    </>
  );
}

export default App;
