import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const Todo: React.FC = () => {
	return (
		<main className="container">
			<header>
				<h1>YHS TODO</h1>
			</header>
			<TodoInput />

			<div className="todo-container">
				<TodoList />
			</div>
		</main>
	);
};

export default Todo;
