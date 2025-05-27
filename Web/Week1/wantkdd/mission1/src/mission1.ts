const todoForm = document.querySelector('form') as HTMLFormElement;
const todoInput = document.querySelector('.input') as HTMLInputElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;
const doneList = document.querySelector('.done-list') as HTMLUListElement;

function addTodo(event: Event): void {
  event.preventDefault();

  const todoText = todoInput.value.trim();
  if (todoText === '') return;

  const li = document.createElement('li');
  li.textContent = todoText;

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '완료';
  completeBtn.className = 'complete-btn';
  completeBtn.addEventListener('click', () => completeTodo(li, todoText));

  li.appendChild(completeBtn);

  todoList.appendChild(li);

  todoInput.value = '';
}

function completeTodo(todo: HTMLLIElement, todoText: string): void {
  todoList.removeChild(todo);

  const li = document.createElement('li');

  li.textContent = todoText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => deleteTodo(li));

  li.appendChild(deleteBtn);

  doneList.appendChild(li);
}

function deleteTodo(done: HTMLLIElement): void {
  doneList.removeChild(done);
}

document.addEventListener('DOMContentLoaded', () => {
  todoForm.addEventListener('submit', addTodo);
});
