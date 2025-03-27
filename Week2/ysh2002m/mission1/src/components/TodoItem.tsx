import { Todo } from '../types';
import { useTodoContext } from '../context/UseTodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const { markAsDone, deleteTodo } = useTodoContext();

  return (
    <li>
      <span>{todo.text}</span>
      {!todo.isDone ? (
        <button className="done-btn" onClick={() => markAsDone(todo.id)}>
          완료
        </button>
      ) : (
        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
          삭제
        </button>
      )}
    </li>
  );
};