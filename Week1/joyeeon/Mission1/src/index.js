console.log("타입스크립트호출테스트");
document.addEventListener("DOMContentLoaded", function () {
    var input = document.querySelector("input");
    var todoColumn = document.querySelector(".taskList");
    var doneColumn = document.querySelector(".doneList");
    var submitBtn = document.querySelector("#submitbtn");
    var addTodo = function () {
        if (!(input === null || input === void 0 ? void 0 : input.value.trim()))
            return;
        //div 컨테이너
        var taskContainer = document.createElement("section");
        taskContainer.classList.add("task-container");
        //문구 
        var newTodo = document.createElement("span");
        newTodo.textContent = input.value.trim();
        newTodo.classList.add("tododiscript");
        //버튼
        var button = document.createElement("button");
        button.textContent = "완료";
        button.classList.add("btn");
        button.addEventListener("click", function () {
            if (button.textContent == "완료") {
                doneColumn === null || doneColumn === void 0 ? void 0 : doneColumn.appendChild(taskContainer);
                button.textContent = "삭제";
                button.classList.add("delete");
            }
            else {
                taskContainer.remove();
            }
        });
        taskContainer.appendChild(newTodo);
        taskContainer.appendChild(button);
        todoColumn === null || todoColumn === void 0 ? void 0 : todoColumn.appendChild(taskContainer);
        input.value = "";
    };
    input === null || input === void 0 ? void 0 : input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });
    submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", function () {
        addTodo();
    });
});
