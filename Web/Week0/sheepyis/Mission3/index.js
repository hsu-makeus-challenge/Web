document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("input");
    const todoList = document.getElementById("todoList");
    const doneList = document.getElementById("doneList");

    // input 이벤트 리스너(엔터)
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && input.value.trim() !== "") {
            addTodoItem(input.value.trim());
            input.value = ""; 
        }
    });

    // 할 일 추가 시
    function addTodoItem(text) {
        const item = document.createElement("div");
        item.classList.add("todo-item");
        
        const textBox = document.createElement("span");
        textBox.textContent = text;
        
        const completeButton = document.createElement("button");
        completeButton.textContent = "완료";
        // 완료 버튼 클릭 시 해낸 일로 이동
        completeButton.addEventListener("click", () => {
            moveToDone(item, text);
        });
        
        item.appendChild(textBox);
        item.appendChild(completeButton);
        todoList.appendChild(item);
    }

    // 해낸 일로 이동 함수
    function moveToDone(item, text) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        // 삭제 버튼 클릭 시 아이템 삭제
        deleteButton.addEventListener("click", () => {
            item.remove();
        });
        
        item.innerHTML = "";
        const textBox = document.createElement("span");
        textBox.textContent = text;
        
        item.appendChild(textBox);
        item.appendChild(deleteButton);
        doneList.appendChild(item);
    }
});