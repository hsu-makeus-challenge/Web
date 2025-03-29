import TodoItem from './todoItem';
import { useTodoContext } from '../context/todoContext';

const TodoListFinish = () => {
  const { todos } = useTodoContext();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료된 일</h2>
      <ul className="render-container__list">
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
      </ul>
    </div>
  );
};

export default TodoListFinish;
