import { type FormEvent, useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoInput: React.FC = () => {
	const [input, setInput] = useState<string>("");
	const { addTodo } = useTodo();

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		const todoTitle = input.trim();

		if (todoTitle) {
			addTodo(todoTitle);
			setInput("");
		}
	};

	return (
		<form id="todo-form" onSubmit={handleSubmit}>
			<input
				type="text"
				id="todo-input"
				placeholder="할 일 입력"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				required
			/>
			<button type="submit" className="add-btn">
				할 일 추가
			</button>
		</form>
	);
};

export default TodoInput;
