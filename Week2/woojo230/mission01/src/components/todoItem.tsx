import { Todo } from '../type';
import { useTodoContext } from '../context/todoContext';

interface TodoItemProps {
  todo: Todo;
}
const TodoItem = ({ todo }: TodoItemProps) => {
  const { completeTodo, deleteTodo } = useTodoContext();

  return (
    <>
      <li className="render-container__item">
        <span>{todo.text}</span>
        <button
          className={
            todo.completed
              ? 'render-container__item-button delete'
              : 'render-container__item-button complete'
          }
          onClick={() => {
            if (todo.completed) {
              deleteTodo(todo.id);
              console.log(`Deleted todo: ${todo.id}`);
            } else {
              completeTodo(todo.id);
              console.log(`Completed todo: ${todo.id}`);
            }
          }}
        >
          {todo.completed ? '삭제' : '완료'}
        </button>
      </li>
    </>
  );
};

export default TodoItem;
