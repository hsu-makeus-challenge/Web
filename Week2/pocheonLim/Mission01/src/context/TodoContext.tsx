import { createContext, useState, ReactNode } from "react";

interface TodoContextType {
  todo: string[];
  doneTodo: string[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  todoPlus: (e: React.FormEvent) => void;
  todoFinish: (item: string) => void;
  removeDoneTodo: (item: string) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todo, setTodo] = useState<string[]>([]);
  const [doneTodo, setDoneTodo] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const todoPlus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodo([...todo, inputValue]);
    setInputValue("");
  };

  const todoFinish = (item: string) => {
    setTodo(todo.filter((todoItem) => todoItem !== item));
    setDoneTodo([...doneTodo, item]);
  };

  const removeDoneTodo = (item: string) => {
    setDoneTodo(doneTodo.filter((doneItem) => doneItem !== item));
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        doneTodo,
        inputValue,
        setInputValue,
        todoPlus,
        todoFinish,
        removeDoneTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
