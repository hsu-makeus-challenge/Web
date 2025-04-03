import { useTodo } from "../../hooks/useTodo";
import ItemTodo from "./item-todo";

interface ListTodoProps {
  title: string;
  isDone: boolean;
}

const ListTodo = ({ title, isDone }: ListTodoProps) => {
  const { todos, doneTasks, handleComplete, handleDelete } = useTodo();

  const items = isDone ? doneTasks : todos;
  const onClick = isDone ? handleDelete : handleComplete;
  const funcName = isDone ? "삭제" : "완료";

  return (
    <ul>
      <p id="title">{title}</p>
      {items.map((item) => (
        <ItemTodo
          key={item.id}
          id={item.id}
          text={item.text}
          funcName={funcName}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

export default ListTodo;
