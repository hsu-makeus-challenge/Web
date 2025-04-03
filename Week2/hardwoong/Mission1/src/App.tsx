import Container from './components/Container';
import Form from './components/Form';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import { TaskProvider } from './contexts/TaskContext';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <Container>
        <h1 className="todo-container__header">WOONG TODO</h1>
        <Form />
        <div className="render-container">
          <TodoList />
          <DoneList />
        </div>
      </Container>
    </TaskProvider>
  );
}

export default App;
