import type { TodoItem } from "./types/todo";

const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const completedList = document.getElementById(
	"completed-list",
) as HTMLUListElement;

let todos: TodoItem[] = [];

// 폼 제출 처리
todoForm.addEventListener("submit", (e: Event) => {
	e.preventDefault();

	const todoTitle = todoInput.value.trim();

	if (todoTitle) {
		addTodo(todoTitle);
		todoInput.value = "";
	}
});

// 할 일 추가
function addTodo(todoTitle: string): void {
	const newTodoItem: TodoItem = {
		id: Date.now(),
		title: todoTitle,
		isCompleted: false,
	};

	todos.push(newTodoItem);
	const todoElement = createTodoElement(newTodoItem);
	todoList.appendChild(todoElement);
}

// 할 일 생성 및 처리
function createTodoElement(todoItem: TodoItem): HTMLLIElement {
	const newTodo = document.createElement("li");
	newTodo.className = "todo-item";
	const todoTitleElement = document.createElement("p");
	todoTitleElement.textContent = todoItem.title;

	const todoButton = document.createElement("button");
	todoButton.type = "button";
	todoButton.className = todoItem.isCompleted ? "delete-btn" : "complete-btn";
	todoButton.textContent = todoItem.isCompleted ? "삭제" : "완료";

	todoButton.addEventListener("click", () => {
		if (todoItem.isCompleted) {
			// 삭제
			todos = todos.filter((item) => item.id !== todoItem.id);
			newTodo.remove();
		} else {
			// 완료
			todoItem.isCompleted = true;
			todoButton.className = "delete-btn";
			todoButton.textContent = "삭제";
			completedList.appendChild(newTodo);
		}
	});

	newTodo.appendChild(todoTitleElement);
	newTodo.appendChild(todoButton);

	return newTodo;
}
