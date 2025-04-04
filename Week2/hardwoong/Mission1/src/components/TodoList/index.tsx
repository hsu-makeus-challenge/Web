import { useTaskContext } from '../../contexts/TaskContext';

const TodoList = () => {
  const { todos, completeTodo } = useTaskContext();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {todos.map((task) => (
          <li key={task.id} className="render-container__item">
            <span className="render-container__item-text">{task.text}</span>
            <button
              onClick={() => completeTodo(task)}
              className="render-container__item-button"
              style={{ backgroundColor: 'green' }}
            >
              완료
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
