import {
	createContext,
	useState,
	type ReactNode,
	type PropsWithChildren,
	useContext,
} from "react";
import type { TodoItemType } from "../types/todo";

interface TodoContextType {
	todos: TodoItemType[];
	addTodo: (title: string) => void;
	completeTodo: (id: number) => void;
	deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
	undefined,
);

export const TodoProvider = ({ children }: PropsWithChildren): ReactNode => {
	const [todos, setTodos] = useState<TodoItemType[]>([]);

	const addTodo = (title: string): void => {
		const newTodo: TodoItemType = {
			id: Date.now(),
			title,
			isCompleted: false,
		};
		setTodos((prevTodos): TodoItemType[] => [...prevTodos, newTodo]);
	};

	const completeTodo = (id: number): void => {
		setTodos((prevTodos): TodoItemType[] =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, isCompleted: true } : todo,
			),
		);
	};

	const deleteTodo = (id: number): void => {
		setTodos((prevTodos): TodoItemType[] =>
			prevTodos.filter((todo): boolean => todo.id !== id),
		);
	};

	return (
		<TodoContext.Provider value={{ todos, addTodo, completeTodo, deleteTodo }}>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodo = (): TodoContextType => {
	const context = useContext(TodoContext);
	if (!context) {
		throw new Error("useTodo Error");
	}
	return context;
};
