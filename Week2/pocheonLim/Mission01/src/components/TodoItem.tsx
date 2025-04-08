import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("에러");
  }

  const { todo, todoFinish } = context;

  return (
    <>
      {todo.map((item, index) => (
        <li key={index} className="render-container__item">
          {item}
          <button
            className="todo-container__button--done"
            onClick={() => todoFinish(item)}
          >
            완료
          </button>
        </li>
      ))}
    </>
  );
};

export default TodoItem;
