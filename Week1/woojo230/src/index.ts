document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector<HTMLInputElement>('.todo_input');
  const doList = document.querySelector<HTMLUListElement>('.doList');
  const didList = document.querySelector<HTMLUListElement>('.didList');

  if (!todoInput || !doList || !didList) {
    console.error('에러다 임마');
    return;
  }

  todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && todoInput.value.trim()) {
      addTodo(todoInput.value.trim(), doList, didList);
      todoInput.value = '';
    }
  });

  const addBtn = document.querySelector<HTMLButtonElement>('.addBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (todoInput.value.trim()) {
        addTodo(todoInput.value.trim(), doList, didList);
        todoInput.value = '';
      }
    });
  }
});

const addTodo = (
  task: string,
  doList: HTMLUListElement,
  didList: HTMLUListElement
): void => {
  const newLi = document.createElement('li');
  newLi.innerHTML = `<span>${task}</span> <button class='complete'>완료</button>`;
  doList.appendChild(newLi);

  newLi.querySelector('.complete')?.addEventListener('click', () => {
    newLi.innerHTML = `<span>${task}</span> <button class='delete'>삭제</button>`;
    didList.appendChild(newLi);
    newLi
      .querySelector('.delete')
      ?.addEventListener('click', () => newLi.remove());
  });
};
