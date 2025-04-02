"use strict";
var todos = [];
var input = document.getElementById("todo-input");
var addBtn = document.getElementById("add-btn");
var todoList = document.getElementById("todo-list");
var doneList = document.getElementById("done-list");
function addTodo() {
    var text = input.value.trim();
    if (text === "")
        return;
    var newTodo = {
        id: Date.now(),
        text: text,
        isDone: false,
    };
    todos.push(newTodo);
    input.value = "";
    renderTodos();
}
function renderTodos() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.textContent = todo.text;
        var btn = document.createElement("button");
        if (!todo.isDone) {
            btn.textContent = "완료";
            btn.className = "done-btn";
            btn.addEventListener("click", function () {
                todo.isDone = true;
                renderTodos();
            });
        }
        else {
            btn.textContent = "삭제";
            btn.className = "delete-btn";
            btn.addEventListener("click", function () {
                todos = todos.filter(function (t) { return t.id !== todo.id; });
                renderTodos();
            });
        }
        li.appendChild(span);
        li.appendChild(btn);
        if (!todo.isDone) {
            todoList.appendChild(li);
        }
        else {
            doneList.appendChild(li);
        }
    });
}
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});
