import { useTodo } from "../context/TodoContext";
import type { TodoItemType } from "../types/todo";

interface TodoItemProps {
	todo: TodoItemType;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	const { completeTodo, deleteTodo } = useTodo();

	const handleButtonClick = (): void => {
		if (todo.isCompleted) {
			deleteTodo(todo.id);
		} else {
			completeTodo(todo.id);
		}
	};

	return (
		<li className="todo-item">
			<p>{todo.title}</p>
			<button
				type="button"
				className={todo.isCompleted ? "delete-btn" : "complete-btn"}
				onClick={handleButtonClick}
			>
				{todo.isCompleted ? "삭제" : "완료"}
			</button>
		</li>
	);
};

export default TodoItem;
