import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos } = useTodo();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todoId={todo.id} isDone={false} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
