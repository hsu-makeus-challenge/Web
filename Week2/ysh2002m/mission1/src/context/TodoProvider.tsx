import React, { useState } from 'react';
import { Todo } from '../types';
import { TodoContext } from './TodoContext';

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isDone: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const markAsDone = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, markAsDone, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
