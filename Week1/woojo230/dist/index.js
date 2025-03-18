"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var todoInput = document.querySelector('.todo_input');
    var doList = document.querySelector('.doList');
    var didList = document.querySelector('.didList');
    if (!todoInput || !doList || !didList) {
        console.error('에러다 임마');
        return;
    }
    todoInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && todoInput.value.trim()) {
            addTodo(todoInput.value.trim(), doList, didList);
            todoInput.value = '';
        }
    });
    var addBtn = document.querySelector('.addBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function () {
            if (todoInput.value.trim()) {
                addTodo(todoInput.value.trim(), doList, didList);
                todoInput.value = '';
            }
        });
    }
});
var addTodo = function (task, doList, didList) {
    var _a;
    var newLi = document.createElement('li');
    newLi.innerHTML = "<span>".concat(task, "</span> <button class='complete'>\uC644\uB8CC</button>");
    doList.appendChild(newLi);
    (_a = newLi.querySelector('.complete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a;
        newLi.innerHTML = "<span>".concat(task, "</span> <button class='delete'>\uC0AD\uC81C</button>");
        didList.appendChild(newLi);
        (_a = newLi
            .querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return newLi.remove(); });
    });
};
