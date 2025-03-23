import { useTodo } from "../../hooks/useTodo";
import ItemTodo from "./item-todo";

interface ListTodoProps {
  title: string;
  funcName: string;
}

const ListTodo = ({ title, funcName }: ListTodoProps) => {
  const { todos, doneTasks, handleComplete, handleDelete } = useTodo();

  const items = funcName === "완료" ? todos : doneTasks;
  const onClick = funcName === "완료" ? handleComplete : handleDelete;

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
