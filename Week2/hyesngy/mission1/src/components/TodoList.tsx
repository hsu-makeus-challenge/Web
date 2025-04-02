import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import type { TodoItemType } from "../types/todo";

const TodoList: React.FC = () => {
	const { todos } = useTodo();

	const Todos: TodoItemType[] = todos.filter(
		(todo: TodoItemType): boolean => !todo.isCompleted,
	);
	const completedTodos: TodoItemType[] = todos.filter(
		(todo: TodoItemType): boolean => todo.isCompleted,
	);

	return (
		<>
			<section>
				<h3>할 일</h3>
				<ul id="todo-list">
					{Todos.map((todo: TodoItemType) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</ul>
			</section>

			<section>
				<h3>완료</h3>
				<ul id="completed-list">
					{completedTodos.map((todo: TodoItemType) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</ul>
			</section>
		</>
	);
};

export default TodoList;
