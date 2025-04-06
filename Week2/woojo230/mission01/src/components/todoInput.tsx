import { FormEvent, useState } from 'react';
import { useTodoContext } from '../context/todoContext';

const TodoInput = () => {
  const [inputText, setInputText] = useState<string>('');
  const { addTodo } = useTodoContext();

  const handleClick = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    addTodo(inputText);
    setInputText('');
    console.log(inputText);
  };

  return (
    <>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="할일이뭔데"
        className="todo-container__input"
      />
      <button
        type="button"
        onClick={() => handleClick()}
        className="todo-container__button"
      >
        할 일 추가
      </button>
    </>
  );
};

export default TodoInput;
