function isEnter(event) {
  if (event.key === 'Enter') {
    const todoList = document.querySelector('.todoList');
    const didList = document.querySelector('.didList');
    const inp = document.querySelector('.inp');
    const content = inp.value;

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = content;
    
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => {
      didList.removeChild(li);
    });
    

    const btn = document.createElement('button');
    btn.textContent = '완료';
    btn.addEventListener('click', () => {
      todoList.removeChild(li);
      li.removeChild(btn);
      li.appendChild(deleteBtn);
      didList.appendChild(li);
    });
    
    

    li.appendChild(span);
    li.appendChild(btn);
    todoList.appendChild(li);

    inp.value = '';
  }
}