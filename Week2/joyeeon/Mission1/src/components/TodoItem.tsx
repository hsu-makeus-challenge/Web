import React from 'react'
import { Todo } from "../context/TodoContext";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <li className="task-container">
            <span className="tododiscript">{todo.text}</span>
            {todo.isdone ? (
                <button className="btn delete" onClick={() => onDelete(todo.id)}>
                    삭제
                </button>
            ) : (
                <button className="btn" onClick={() => onToggle(todo.id)}>
                    완료
                </button>
            )}
        </li>
    );
};

export default TodoItem;