import { useTodo } from "../context/TodoContext";

interface TodoItemProps {
  todoId: number;
  isDone: boolean;
}

const TodoItem = ({ todoId, isDone }: TodoItemProps) => {
  const { todos, doneTasks, completeTask, deleteTask } = useTodo();

  // todoId를 기반으로 해당 todo 찾기
  const todo = isDone
    ? doneTasks.find((t) => t.id === todoId)
    : todos.find((t) => t.id === todoId);

  if (!todo) return null; // 해당 todo가 없으면 렌더링하지 않음.

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
