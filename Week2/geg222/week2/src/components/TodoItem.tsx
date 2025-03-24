import { useTodo } from "../context/TodoContext";

interface TodoItemProps {
  todoId: number;
  isDone: boolean;
}

const TodoItem = ({ todoId, isDone }: TodoItemProps) => {
  const { todos, doneTasks, completeTask, deleteTask } = useTodo();

  const todo = isDone
    ? doneTasks.find((t) => t.id === todoId)
    : todos.find((t) => t.id === todoId);

  if (!todo) return null;

  return (
    <li className="render-container__item">
      {todo.text}
      <button
        className="render-container__item-button"
        style={{ backgroundColor: isDone ? "#dc3545" : "#28a745" }}
        onClick={() => (isDone ? deleteTask(todo) : completeTask(todo))}
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
};

export default TodoItem;
