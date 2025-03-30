import TodoInput from './components/todoInput';
import TodoList from './components/todoList';
import TodoListFinish from './components/todoListFinish';
import { TodoProvider } from './context/todoContext';
import './App.css';

const App = () => {
  return (
    <>
      <TodoProvider>
        <div className="todo-container">
          <h1 className="todo-container__header">YONG TODO</h1>
          <div className="todo-container__form">
            <TodoInput />
          </div>
          <div className="render-container">
            <TodoList />
            <TodoListFinish />
          </div>
        </div>
      </TodoProvider>
    </>
  );
};

export default App;
