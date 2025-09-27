import './App.css';
import Todo from './components/Todo';
import { TodoProvider } from './context/TodoContext';

import { type JSX } from "react";
function App(): JSX.Element {

  return (
    <TodoProvider>
    <Todo />
    </TodoProvider>
  );
}

export default App;
