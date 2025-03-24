import { createContext, useContext, useState, ReactNode } from 'react';

interface Todo {
    id: number;
    text: string;
    isdone: boolean;
}

interface TodoContextType {
    input:string;
    todos:Todo[];
    setInput: (text: string) => void;
    addTodo: () => void;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType| undefined>(
    undefined
);

export const TodoPorvider = ({ children }: { children: ReactNode }) => {
    const [input, setInput] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [idnum, setIdnum] = useState<number>(1);

    const addTodo = (): void => {
        //공백 제거함 
        const inputTrim = input.trim();
        if (!inputTrim) return;

        const newTodo: Todo = {
            id: idnum,
            text: inputTrim,
            isdone: false,
        };

        setTodos(prev => [...prev, newTodo]);
        setIdnum(prev => prev + 1);
        setInput("");
    };

    const toggleTodo = (id: number) => {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id ? { ...todo, isdone: !todo.isdone } : todo
            )
        );
    }

    const deleteTodo = (id: number) => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    return (
        <TodoContext.Provider
            value={{input, todos, setInput, addTodo, toggleTodo, deleteTodo}}
        >
            {children}
        </TodoContext.Provider>
    )
}



export const useTodo = () => {
    const context = useContext(TodoContext)
    if (!context) {
        throw new Error(
            'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
        );
    }
    return context;
}