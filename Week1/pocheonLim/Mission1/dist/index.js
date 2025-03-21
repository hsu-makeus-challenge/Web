"use strict";
const input = document.querySelector(".search input");
const addButton = document.querySelector(".search button");
const todoContainer = document.querySelector(".todos:first-of-type");
const completedContainer = document.querySelector(".todos:last-of-type");
const addTodo = () => {
    if (!input || !todoContainer)
        return;
    const text = input.value.trim();
    if (text === "")
        return;
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    const todoText = document.createElement("span");
    todoText.textContent = text;
    todoItem.appendChild(todoText);
    const completeButton = document.createElement("button");
    completeButton.textContent = "완료";
    completeButton.classList.add("complete-button");
    completeButton.addEventListener("click", () => {
        todoItem.removeChild(completeButton);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            todoItem.remove();
        });
        todoItem.appendChild(deleteButton);
        todoContainer.removeChild(todoItem);
        completedContainer === null || completedContainer === void 0 ? void 0 : completedContainer.appendChild(todoItem);
    });
    todoItem.appendChild(completeButton);
    todoContainer.appendChild(todoItem);
    input.value = "";
};
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addTodo);
input === null || input === void 0 ? void 0 : input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});
