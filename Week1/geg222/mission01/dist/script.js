"use strict";
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let doneTasks = [];
const renderTasks = () => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    if (text === "") {
        return;
    }
    const newTodo = { id: Date.now(), content: text };
    todos.push(newTodo);
    todoInput.value = "";
    renderTasks();
};
const completeTaskTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, inDone) => {
    const li = document.createElement("li");
    li.classList.add("render-container__item");
    li.textContent = todo.content;
    const button = document.createElement("button");
    button.classList.add("render-container__item-button");
    if (inDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "#dc3545";
        button.addEventListener("click", () => deleteTodo(todo));
    }
    else {
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
        button.addEventListener("click", () => completeTaskTodo(todo));
    }
    li.appendChild(button);
    return li;
};
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTasks();
