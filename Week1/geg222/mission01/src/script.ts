// 1. HTML 요소 선택
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 2. 할 일 타입 정의
type Todo = {
  id: number;
  content: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// 3. 할 일 목록 렌더링 함수
const renderTasks = (): void => {
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

// 4. 할 일 입력값 가져오기
const getTodoText = (): string => {
  return todoInput.value.trim();
};

// 5. 할 일 추가
const addTodo = (text: string): void => {
  if (text === "") {
    return;
  }

  const newTodo: Todo = { id: Date.now(), content: text };
  todos.push(newTodo);

  todoInput.value = "";
  renderTasks();
};

// 6. 할 일을 완료 리스트로 이동
const completeTaskTodo = (todo: Todo): void => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};

// 7. 완료된 할 일을 삭제
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};

// 8. HTML 리스트 요소 생성
const createTodoElement = (todo: Todo, inDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("render-container__item");
  li.textContent = todo.content;

  const button = document.createElement("button");
  button.classList.add("render-container__item-button");

  if (inDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#dc3545";
    button.addEventListener("click", () => deleteTodo(todo));
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745";
    button.addEventListener("click", () => completeTaskTodo(todo));
  }

  li.appendChild(button);
  return li;
};

// 9. 폼 제출 이벤트 리스너
todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();

  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

// 초기 렌더링 실행
renderTasks();
