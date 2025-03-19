document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const doneList = document.getElementById('done-list');

  function add(todoText) {
    const li = document.createElement('li');
    li.textContent = todoText;

    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.addEventListener('click', () => complete(li));

    li.appendChild(completeButton);
    todoList.appendChild(li);
  }

  function complete(todoItem) {
    const doneItem = todoItem.cloneNode(true);
    doneItem.querySelector('button').textContent = '삭제';
    doneItem
      .querySelector('button')
      .addEventListener('click', () => remove(doneItem));

    doneList.appendChild(doneItem);
    todoItem.remove();
  }

  function remove(doneItem) {
    doneItem.remove();
  }

  todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const todoText = todoInput.value.trim();
      if (todoText) {
        add(todoText);
        todoInput.value = '';
      }
    }
  });
});
