interface Todo {
    id: number;
    text: string;
    isDone: boolean;
  }
  
  let todos: Todo[] = [];
  
  const input = document.getElementById("todo-input") as HTMLInputElement;
  const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
  const todoList = document.getElementById("todo-list") as HTMLUListElement;
  const doneList = document.getElementById("done-list") as HTMLUListElement;
  
  function addTodo() {
    const text = input.value.trim();
    if (text === "") return;
  
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isDone: false,
    };
  
    todos.push(newTodo);
    input.value = "";
    renderTodos();
  }
  
  function renderTodos() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
  
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = todo.text;
  
      const btn = document.createElement("button");
  
      if (!todo.isDone) {
        btn.textContent = "완료";
        btn.className = "done-btn";
        btn.addEventListener("click", () => {
          todo.isDone = true;
          renderTodos();
        });
      } else {
        btn.textContent = "삭제";
        btn.className = "delete-btn";
        btn.addEventListener("click", () => {
          todos = todos.filter((t) => t.id !== todo.id);
          renderTodos();
        });
      }
  
      li.appendChild(span);
      li.appendChild(btn);
  
      if (!todo.isDone) {
        todoList.appendChild(li);
      } else {
        doneList.appendChild(li);
      }
    });
  }
  
  addBtn.addEventListener("click", addTodo);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });
  