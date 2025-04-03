import { TTodo } from "../../types/ttodo";
import { createContext, useState, PropsWithChildren, useContext, JSX } from "react";

console.log("TodoContext.tsx 실행중");

export interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: TTodo = {
      id: Date.now(), // ✅ number로 설정
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const completeTodo = (todo: TTodo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, { ...todo, completed: true }]);
  };

  const deleteTodo = (todo: TTodo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <TodoContext.Provider value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodoContext = (): ITodoContext => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodoContext must be used within a TodoProvider");
  return context;
};

export default TodoContext;
