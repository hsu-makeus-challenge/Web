// 할 일 추가 함수
function keyCheck(event) {
  if (event.key === 'Enter') {
    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    const newBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const todoInput = document.querySelector('.todoInput');
    const doList = document.querySelector('.doList');
    const didList = document.querySelector('.didList');

    newSpan.textContent = todoInput.value;
    newBtn.textContent = '완료';
    delBtn.textContent = '삭제';

    newLi.appendChild(newSpan);
    newLi.appendChild(newBtn);
    doList.appendChild(newLi);

    todoInput.value = '';

    newBtn.addEventListener('click', () => {
      doList.removeChild(newLi);
      newLi.removeChild(newBtn);
      newLi.appendChild(delBtn);
      didList.appendChild(newLi);
    });

    delBtn.addEventListener('click', () => {
      didList.removeChild(newLi);
    });
  }
}
