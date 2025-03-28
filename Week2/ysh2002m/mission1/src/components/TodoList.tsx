import { useTodoContext } from '../context/UseTodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos } = useTodoContext();

  return (
    <div className="list-section">
      <div className="list">
        <h3>할 일</h3>
        <ul>
          {todos.filter((t) => !t.isDone).map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
      <div className="list">
        <h3>완료</h3>
        <ul>
          {todos.filter((t) => t.isDone).map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};