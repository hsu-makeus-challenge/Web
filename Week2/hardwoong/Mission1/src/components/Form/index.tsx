import { FormEvent } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';

const Form = () => {
  const { addTodo } = useTaskContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('todo-input') as HTMLInputElement;
    const value = input.value.trim();
    if (!value) return;
    addTodo(value);
    input.value = '';
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className="todo-container__button">할 일 추가</button>
    </form>
  );
};

export default Form;
