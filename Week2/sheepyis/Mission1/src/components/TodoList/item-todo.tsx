interface ItemTodoProps {
    id: number;
    text: string;
    funcName: string;
    onClick: (id: number) => void;
  }

const ItemTodo = ({ id, text, funcName, onClick }: ItemTodoProps ) => {
  const isDelete = funcName === "삭제";

    return (
        <li>
          <p>{text}</p>
          <button className={isDelete ? 'delete' : ''} onClick={() => onClick(id)}>{funcName}</button>
        </li>
    )
}

export default ItemTodo;