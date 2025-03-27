import { useState, KeyboardEvent } from 'react';
import { useTodoContext } from '../context/UseTodoContext';

export const TodoInput = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTodo } = useTodoContext();

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    addTodo(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="할 일 입력"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button id="add-btn" onClick={handleAdd}>
        할 일 추가
      </button>
    </div>
  );
};