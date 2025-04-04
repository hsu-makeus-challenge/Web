import { useTodo } from "../context/TodoContext";

const TodoList = () => {
    const { todos, toggleTodo, deleteTodo } = useTodo();
    return (
        <article id="Todolist">
            <ul className="taskList">
                <h4>할 일</h4>
                {todos
                    .filter(todo => !todo.isdone)
                    .map(todo => (
                        <li className='task-container'>
                            <span className='tododiscript'>{todo.text}</span>
                            <button className='btn'
                                onClick={() => toggleTodo(todo.id)}>
                                완료
                            </button>
                        </li>
                    ))
                }
            </ul>

            <ul className="doneList">
                <h4>완료</h4>
                {todos
                    .filter(todo => todo.isdone)
                    .map(todo => (
                        <li className='task-container'>
                            <span className='tododiscript'>{todo.text}</span>
                            <button className='btn delete'
                                onClick={() => deleteTodo(todo.id)}>
                                삭제
                            </button>
                        </li>
                    ))
                }
            </ul>
        </article>
    )
}

export default TodoList;