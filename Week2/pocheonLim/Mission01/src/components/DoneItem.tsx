import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const DoneItem = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("에러");
  }

  const { doneTodo, removeDoneTodo } = context;

  return (
    <>
      {doneTodo.map((item, index) => (
        <li key={index} className="render-container__item">
          {item}
          <button
            className="todo-container__button--delete"
            onClick={() => removeDoneTodo(item)}
          >
            삭제
          </button>
        </li>
      ))}
    </>
  );
};

export default DoneItem;
