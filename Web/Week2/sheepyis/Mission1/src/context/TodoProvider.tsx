import { createContext, ReactNode, useState } from "react";
import { Todo } from "../types/todo";

interface TodoContextType {
    input: string;
    todos: Todo[];
    doneTasks: Todo[];
    setInput: (value: string) => void;
    handleAdd: (e: React.FormEvent) => void;
    handleComplete: (id: number) => void;
    handleDelete: (id: number) => void;
}

// Context 생성
export const TodoContext = createContext<TodoContextType | undefined> (undefined);

// Context Provider 생성
export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [doneTasks, setDoneTasks] = useState<Todo[]>([]);
    const [nextId, setNextId] = useState(0);
    
    // 할 일 추가
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const text = input.trim();
        if (!text) return;

        setTodos([...todos, { id: nextId, text }]);
        setNextId((prev) => prev + 1);
        setInput("");
    }

    // 완료 버튼 클릭 시
    const handleComplete = (id: number) => {
        const target = todos.find(t => t.id === id);
        if (!target) return;

        setTodos(todos.filter(t => t.id !== id));
        setDoneTasks([...doneTasks, target]);
    }

    // 할 일 삭제
    const handleDelete = (id: number) => {
        setDoneTasks(doneTasks.filter(t => t.id !== id));
    }

    return (
        <TodoContext.Provider value={{ input, todos, doneTasks, setInput, handleAdd, handleComplete, handleDelete }}>
            {children}
        </TodoContext.Provider>
    );
}