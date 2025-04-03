"use strict";
const input = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
let todos = [];
let doneTasks = [];
let nextId = 0;
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter")
        handleAdd();
});
addButton.addEventListener("click", handleAdd);
function handleAdd() {
    const text = input.value.trim();
    if (!text)
        return;
    todos.push({ id: nextId++, text });
    input.value = "";
    render();
}
function completeTodo(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1)
        return;
    const [done] = todos.splice(index, 1);
    if (done) {
        doneTasks.push(done);
        render();
    }
}
function deleteTask(id) {
    doneTasks = doneTasks.filter(t => t.id !== id);
    render();
}
function render() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        const textBox = document.createElement("span");
        textBox.textContent = todo.text;
        const button = document.createElement("button");
        button.textContent = "완료";
        button.onclick = () => completeTodo(todo.id);
        li.appendChild(textBox);
        li.appendChild(button);
        todoList.appendChild(li);
    });
    doneTasks.forEach(task => {
        const li = document.createElement("li");
        const textBox = document.createElement("span");
        textBox.textContent = task.text;
        const button = document.createElement("button");
        button.textContent = "삭제";
        button.classList.add("delete");
        button.onclick = () => deleteTask(task.id);
        li.appendChild(textBox);
        li.appendChild(button);
        doneList.appendChild(li);
    });
}
