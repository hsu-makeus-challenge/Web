import { createContext } from 'react';
import { Todo } from '../types';

export interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  markAsDone: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);