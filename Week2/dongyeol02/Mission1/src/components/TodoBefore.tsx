import { FormEvent, useState } from "react";
import { TTodo } from "../types/todd";

const TodoBefore = (): Element => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setinput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const text = input.trim();

    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
      setinput("");
    }
  };

  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos) => prevTodos.filter((t): boolean => t.id !== todo.id));
    setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevDoneTodos): TTodo[] =>
      prevDoneTodos.filter((t): boolean => t.id !== todo.id)
    );
  };
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <form
        id="todo-form"
        className="todo-container__form"
        onSubmit={handleSubmit}
      >
        <input
          value={input}
          onChange={(e): void => setinput(e.target.value)}
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

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todos.map(
              (todo): Element => (
                <li key={todo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {todo.text}
                  </span>
                  <button
                    style={{ backgroundColor: "#28a745" }}
                    className="render-container__item-button"
                    onClick={(e): void => completeTodo(todo)}
                  >
                    완료
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="render-container__section">
          <h2 className="render-container__title">완 료</h2>
          <ul id="done-list" className="render-container__list">
            {doneTodos.map(
              (todo): Element => (
                <li key={todo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {todo.text}
                  </span>
                  <button
                    style={{ backgroundColor: "#DC3545" }}
                    className="render-container__item-button"
                    onClick={(): void => deleteTodo(todo)}
                  >
                    삭제
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TodoBefore;
