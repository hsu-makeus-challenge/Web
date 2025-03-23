const input = document.getElementById("todoInput") as HTMLInputElement;
const addButton = document.getElementById("addButton") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const doneList = document.getElementById("doneList") as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];
let nextId = 0;

// 엔터 이벤트
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") handleAdd();
});
addButton.addEventListener("click", handleAdd);

// 할 일 추가
function handleAdd() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ id: nextId++, text });
    input.value = "";
    render();
}

// 완료 버튼 클릭 시
function completeTodo(id: number) {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return;

    const [done] = todos.splice(index, 1);
    if (done) {
        doneTasks.push(done);
        render();
    }
}

// 할 일 삭제
function deleteTask(id: number) {
    doneTasks = doneTasks.filter(t => t.id !== id);
    render();
}

function render() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    // 할 일 목록
    todos.forEach(todo => {
        const li = document.createElement("li");

        const textSpan = document.createElement("span");
        textSpan.textContent = todo.text;

        const button = document.createElement("button");
        button.textContent = "완료";
        button.onclick = () => completeTodo(todo.id);

        li.appendChild(textSpan);
        li.appendChild(button);
        todoList.appendChild(li);
    });

    // 완료된 목록
    doneTasks.forEach(task => {
        const li = document.createElement("li");

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;

        const button = document.createElement("button");
        button.textContent = "삭제";
        button.classList.add("delete");
        button.onclick = () => deleteTask(task.id);

        li.appendChild(textSpan);
        li.appendChild(button);
        doneList.appendChild(li);
    });
}
