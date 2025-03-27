console.log("타입스크립트호출테스트");

document.addEventListener("DOMContentLoaded", () =>{
    const input = document.querySelector("input");
    const todoColumn = document.querySelector(".taskList");
    const doneColumn = document.querySelector(".doneList");
    const submitBtn = document.querySelector("#submitbtn");

    const addTodo= () : void  =>{
        if(!input?.value.trim()) return;

        //div 컨테이너
        const taskContainer = document.createElement("section");
        taskContainer.classList.add("task-container");

        //문구 
        const newTodo = document.createElement("span");
        newTodo.textContent = input.value.trim();
        newTodo.classList.add("tododiscript");

        //버튼
        const button = document.createElement("button");
        button.textContent = "완료";
        button.classList.add("btn");

        button.addEventListener("click", function () {
            if (button.textContent == "완료") {
                doneColumn?.appendChild(taskContainer);
                button.textContent = "삭제";
                button.classList.add("delete");
            }
            else {
                taskContainer.remove();
            }
        })

        taskContainer.appendChild(newTodo);
        taskContainer.appendChild(button);
        todoColumn?.appendChild(taskContainer);

        input.value = "";
    }

    input?.addEventListener("keydown", (event : KeyboardEvent) =>{
        if (event.key === "Enter") {
            addTodo();
        }
    });

    submitBtn?.addEventListener("click", () =>{
            addTodo();
    });
})