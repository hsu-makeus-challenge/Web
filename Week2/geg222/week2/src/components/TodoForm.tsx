import { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="todo-container__input"
        placeholder="할 일 입력"
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
