import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import DoneItem from './components/DoneItem';
import { TodoProvider } from './context/TodoContext';

const App = () => {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">YONG TODO</h1>
        <TodoForm />
        <div className="render-container">
          <div className="render-container__section">
            <h2 className="render-container__title">할 일</h2>
            <ul id="todo-list" className="render-container__list">
              <TodoItem />
            </ul>
          </div>
          <div className="render-container__section">
            <h2 className="render-container__title">완료</h2>
            <ul id="done-list" className="render-container__list">
              <DoneItem />
            </ul>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
