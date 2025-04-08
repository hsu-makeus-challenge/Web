import { useTodo } from "../../hooks/useTodo";

const Form = () => {
    const { input, setInput, handleAdd } = useTodo();

    return (
        <form id="inputContainer" onSubmit={handleAdd}>
            <input placeholder="할 일 입력" id="todoInput" value={input} onChange={(e) => setInput(e.target.value)} required/>
            <button type="submit" id="addButton">할 일 추가</button>
        </form>
    )
}

export default Form;