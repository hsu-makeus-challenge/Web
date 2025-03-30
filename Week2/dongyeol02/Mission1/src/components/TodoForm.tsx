import React from "react";

interface TodoFormProprs {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const TodoForm = ({
  input,
  setInput,
  handleSubmit,
}: TodoFormProprs): Element => {
  return (
    <form
      id="todo-form"
      className="todo-container__form"
      onSubmit={handleSubmit}
    >
      <input
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        type="text"
        placeholder="할 일을 적어주세요"
        className="todo-container__input"
        id="todo-input"
        required
      ></input>
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
