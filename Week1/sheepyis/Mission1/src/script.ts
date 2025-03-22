const input = document.getElementById("todoInput") as HTMLInputElement;
const addButton = document.getElementById("addButton") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const doneList = document.getElementById("doneList") as HTMLUListElement;

// input 엔터 시
input.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter" && input.value.trim() !== "") {
        addTodoItem(input.value.trim());
        input.value = "";
    }
});

// 추가 버튼 클릭 시
addButton.addEventListener("click", () => {
    if (input.value.trim() !== "") {
        addTodoItem(input.value.trim());
        input.value = "";
    }
});

// 할 일 추가
function addTodoItem(text: string): void {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    const textBox = document.createElement("span");
    textBox.textContent = text;

    const completeButton = document.createElement("button");
    completeButton.textContent = "완료";

    // 완료 버튼 클릭 시 -> li 이동
    completeButton.addEventListener("click", () => moveToDone(li, text));

    li.appendChild(textBox);
    li.appendChild(completeButton);
    todoList.appendChild(li);
}

// 이동
function moveToDone(li: HTMLLIElement, text: string): void {
    li.innerHTML = "";

    const textBox = document.createElement("span");
    textBox.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "삭제";

    // 삭제 버튼 클릭 시 -> li 삭제
    deleteButton.addEventListener("click", () => li.remove());

    li.appendChild(textBox);
    li.appendChild(deleteButton);
    doneList.appendChild(li);
}