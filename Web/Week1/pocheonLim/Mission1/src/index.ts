const input = document.querySelector<HTMLInputElement>(".search input");
const addButton = document.querySelector<HTMLButtonElement>(".search button");
const todoContainer = document.querySelector<HTMLDivElement>(".todos:first-of-type");
const completedContainer = document.querySelector<HTMLDivElement>(".todos:last-of-type");

const addTodo = () => {
    if (!input || !todoContainer) return;

    const text = input.value.trim();
    if (text === "") return; 

    // 할 일 생성
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const todoText = document.createElement("span");
    todoText.textContent = text;
    todoItem.appendChild(todoText);

    const completeButton = document.createElement("button");
    completeButton.textContent = "완료";
    completeButton.classList.add("complete-button");

    // 완료 버튼 클릭
    completeButton.addEventListener("click", () => {
        
        todoItem.removeChild(completeButton);
        
        // 삭제 버튼 생성
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete-button");
  
        deleteButton.addEventListener("click", () => {
            todoItem.remove();
        });
  
        todoItem.appendChild(deleteButton);
        
        todoContainer.removeChild(todoItem);
        completedContainer?.appendChild(todoItem);
    });

    todoItem.appendChild(completeButton);

    todoContainer.appendChild(todoItem);

    input.value = "";
};

addButton?.addEventListener("click", addTodo);

input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});
