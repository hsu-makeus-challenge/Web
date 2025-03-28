import './App.css';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './context/TodoProvider';

function App() {
  return (
    <TodoProvider>
      <div className="container">
        <h2>YONG TODO</h2>
        <TodoInput />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;