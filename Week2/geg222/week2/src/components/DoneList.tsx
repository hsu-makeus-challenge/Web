import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const DoneList = () => {
  const { doneTasks } = useTodo();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul className="render-container__list">
        {doneTasks.map((todo) => (
          <TodoItem key={todo.id} todoId={todo.id} isDone={true} />
        ))}
      </ul>
    </div>
  );
};

export default DoneList;
