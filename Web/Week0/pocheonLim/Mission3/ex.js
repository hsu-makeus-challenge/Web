// input 요소와 해야 할 일 영역 가져오기
const input = document.querySelector('input');
const todosContainer = document.querySelector('.todos-container');

// '해야 할 일' div 가져오기
const todoList = document.querySelectorAll('.todos')[0];

// '해낸 일' div 가져오기
const doneList = document.querySelectorAll('.todos')[1];

// 엔터 키를 누르면 해야 할 일에 추가하는 이벤트 리스너
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && input.value.trim() !== '') {
        // 입력값 가져오기
        const todoText = input.value.trim();
        
        // 새로운 할 일 항목 생성
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        // 할 일 텍스트 추가
        const todoContent = document.createElement('p');
        todoContent.textContent = todoText;
        todoItem.appendChild(todoContent);

        // 완료 버튼 생성
        const completeButton = document.createElement('button');
        completeButton.textContent = '완료';
        todoItem.appendChild(completeButton);

        // '해야 할 일'에 새 항목 추가
        todoList.appendChild(todoItem);

        // 완료 버튼 클릭 시 '해낸 일'로 이동하고 삭제 버튼으로 변경
        completeButton.addEventListener('click', function() {
            // 완료된 항목을 '해낸 일'로 이동
            doneList.appendChild(todoItem);

            // 완료 버튼을 삭제 버튼으로 바꿈
            completeButton.textContent = '삭제';
            completeButton.addEventListener('click', function() {
                // 삭제 버튼 클릭 시 항목 삭제
                todoItem.remove();
            });
        });

        // 입력값 초기화
        input.value = '';
    }
});
