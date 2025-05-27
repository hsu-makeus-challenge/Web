const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");

todoForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const todoName = todoInput.value;

	if (todoName.trim() !== "") {
		addTask(todoName);
		todoInput.value = "";
	}
});

todoInput.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		const todoName = todoInput.value;

		if (todoName.trim() !== "") {
			addTask(todoName);
			todoInput.value = "";
		}
	}
});

function addTask(todoName) {
	const newTodo = document.createElement("li");
	const todoTitle = document.createElement("h3");
	const todoButton = document.createElement("button");

	newTodo.classList.add("todo");
	todoButton.classList.add("todoButton");

	todoTitle.textContent = todoName;
	todoButton.textContent = "완료";

	todoButton.addEventListener("click", () => {
		if (todoButton.textContent === "완료") {
			completeTask(newTodo, todoButton);
		} else {
			newTodo.remove();
		}
	});

	newTodo.appendChild(todoTitle);
	newTodo.appendChild(todoButton);

	const taskList = document.querySelector(".taskList");
	taskList.appendChild(newTodo);
}

function completeTask(newTodo, todoButton) {
	const completedList = document.querySelector(".completedList");
	todoButton.textContent = "삭제";
	completedList.appendChild(newTodo);
}
