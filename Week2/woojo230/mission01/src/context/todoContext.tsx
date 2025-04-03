import { createContext, useState, useContext } from 'react';
import { Todo } from '../type';

export interface TodoContextProps {
  todos: Todo[];
  addTodo: (text: string) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodoContext = (): TodoContextProps => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error(
      'useTodoContext는 TodoProvider 내부에서만 사용할 수 있습니다'
    );
  }

  return context;
};

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(1);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: todoId,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodoId((prev) => prev + 1);
  };

  const completeTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
