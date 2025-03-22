document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("input");
    const todoColumn = document.querySelector(".taskList");
    const doneColumn = document.querySelector(".doneList")

    input.addEventListener("keydown", function(event) {
        if(event.key === "Enter") {
            //div 컨테이너
            const taskContainer = document.createElement("article");
            taskContainer.classList.add("task-container");

            //문구 
            const newTodo = document.createElement("span");
            newTodo.textContent = input.value.trim();
            newTodo.classList.add("todo");

            //버튼
            const button = document.createElement("button");
            button.textContent = "완료";
            button.classList.add("btn");
            button.addEventListener("click", function () {
                if (button.textContent == "완료") {
                    doneColumn.appendChild(taskContainer);
                    button.textContent = "삭제";
                }
                else {
                    taskContainer.remove();
                }
            })

            taskContainer.appendChild(newTodo);
            taskContainer.appendChild(button);

            todoColumn.appendChild(taskContainer);
            input.value = "";
        }
    })
})