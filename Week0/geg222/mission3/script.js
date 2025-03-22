document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('input[type="text"]');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            addTask(this.value);
            this.value = '';
        }
    });

    function addTask(taskName) {
        const taskList = document.querySelector('.column:first-child .task-list');
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <div class="task-name">${taskName}</div>
            <div class="task-status">완료</div>
        `;
        
        const taskStatus = taskItem.querySelector('.task-status');
        taskStatus.addEventListener('click', function() {
            moveTaskToCompleted(taskItem);
        });
        
        taskList.appendChild(taskItem);
    }

    function moveTaskToCompleted(taskItem) {
        const completedList = document.querySelector('.column:last-child .task-list');
        const taskName = taskItem.querySelector('.task-name').textContent;
        
        const newTaskItem = document.createElement('div');
        newTaskItem.className = 'task-item';
        newTaskItem.innerHTML = `
            <div class="task-name">${taskName}</div>
            <div class="task-status complete">삭제</div>
        `;
        
        const deleteButton = newTaskItem.querySelector('.task-status');
        deleteButton.addEventListener('click', function() {
            newTaskItem.remove();
        });
        
        completedList.appendChild(newTaskItem);
        taskItem.remove();
    }
});