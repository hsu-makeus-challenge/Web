import { FormEvent, JSX, useState } from "react";
import { TTodo } from "../types/ttodo";
import TodoForm from "./TodoForm";

console.log("TodoBefore.tsx 실행중");

const TodoBefore = (): JSX.Element => {
  const [todos, setTodos] = useState<TTodo[]>([
    {
      id: 1,
      text: "오타니",
      completed: false,
    },
  ]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([
    {
      id: 1,
      text: "오타니",
      completed: true,
    },
  ]);
  const [input, setInput] = useState<string>("");

  console.log("Input", input);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
  
    if (text) {
      addTodo(text); // ✅ 여기서 사용하도록 변경
      setInput("");
    }
  };  

  const addTodo = (text: string) => {
    const newTodo: TTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };  

  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos: TTodo[]) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos: TTodo[]) => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevDoneTodos: TTodo[]) =>
      prevDoneTodos.filter((t) => t.id !== todo.id)
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__form">
        <TodoForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
        <form onSubmit={handleSubmit} className="todo-container__form">
          <input
            value={input}
            onChange={(e): void => setInput(e.target.value)}
            type="text"
            className="todo-container__for__input"
            placeholder="할 일 입력"
            required
          />
          <button type="submit" className="todo-container__form__button">
            할 일 추가
          </button>
        </form>
      </h1>
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
        </div>
        <ul id="todo-list" className="render-container__list">
          {todos.map(
            (todo): JSX.Element => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={(): void => completeTodo(todo)}
                  style={{
                    backgroundColor: "green",
                  }}
                  className="render-container__item-button"
                >
                  완료
                </button>
              </li>
            )
          )}
        </ul>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list">
            {doneTodos.map(
              (todo): JSX.Element => (
                <li key={todo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {todo.text}
                  </span>
                  <button
                    style={{
                      backgroundColor: "red",
                    }}
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
