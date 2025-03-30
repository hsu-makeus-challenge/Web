import { FormEvent, JSX, useContext, useState } from "react";
import TodoList from "./TodoList";
import TodoContext from "./context/TodoContext";
import { TTodo } from "../types/ttodo";

console.log("Todo.tsx 실행중");

const Todo = (): JSX.Element => {
  const [input, setInput] = useState<string>("");

  // 🔥 TodoContext에서 전역 상태 및 함수 가져오기
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    console.error("❌ TodoContext가 undefined입니다.");
    return <div>Context를 불러올 수 없습니다.</div>;
  }

  const { todos, doneTodos, addTodo, completeTodo, deleteTodo } = todoContext;

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    console.log("📝 입력된 값:", text);

    if (text) {
      console.log("➕ addTodo 호출됨");
      addTodo(text);
      setInput("");
    } else {
      console.warn("⚠️ 입력값이 비어 있어 추가되지 않음");
    }
  };

  const handleComplete = (todo: TTodo) => {
    console.log("✅ completeTodo 호출됨:", todo);
    completeTodo(todo);
  };

  const handleDelete = (todo: TTodo) => {
    console.log("🗑️ deleteTodo 호출됨:", todo);
    deleteTodo(todo);
  };

  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit} className="todo-container__form">
        <input
          value={input}
          onChange={(e) => {
            console.log("⌨️ 입력 중:", e.target.value);
            setInput(e.target.value);
          }}
          type="text"
          className="todo-container__form__input"
          placeholder="할 일 입력"
          required
        />
        <button type="submit" className="todo-container__form__button">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="green"
          onClick={handleComplete}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="gray"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Todo;
