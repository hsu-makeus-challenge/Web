import { useTodo } from "../context/TodoContext";

const TodoInput = () => {
    const { input, addTodo, setInput } = useTodo();

    const handlekeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTodo();
        }
    };

    return (
        <header>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handlekeydown}
                placeholder="할 일 입력" />
            <button id="submitbtn" onClick={addTodo}>할 일 추가</button>
        </header>
    )
}

export default TodoInput;