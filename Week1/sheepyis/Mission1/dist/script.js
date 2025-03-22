"use strict";
const input = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && input.value.trim() !== "") {
        addTodoItem(input.value.trim());
        input.value = "";
    }
});
addButton.addEventListener("click", () => {
    if (input.value.trim() !== "") {
        addTodoItem(input.value.trim());
        input.value = "";
    }
});
function addTodoItem(text) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    const textBox = document.createElement("span");
    textBox.textContent = text;
    const completeButton = document.createElement("button");
    completeButton.textContent = "완료";
    completeButton.addEventListener("click", () => moveToDone(li, text));
    li.appendChild(textBox);
    li.appendChild(completeButton);
    todoList.appendChild(li);
}
function moveToDone(li, text) {
    li.innerHTML = "";
    const textBox = document.createElement("span");
    textBox.textContent = text;
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => li.remove());
    li.appendChild(textBox);
    li.appendChild(deleteButton);
    doneList.appendChild(li);
}
