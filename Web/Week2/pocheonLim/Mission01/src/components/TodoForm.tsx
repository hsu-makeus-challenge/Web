import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoForm = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("에러");
  }

  const { inputValue, setInputValue, todoPlus } = context;

  return (
    <form id="todo-form" className="todo-container__form" onSubmit={todoPlus}>
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
