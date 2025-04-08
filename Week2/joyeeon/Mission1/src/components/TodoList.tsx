import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const { todos, toggleTodo, deleteTodo } = useTodo();
    return (
        <article id="Todolist">
            <ul className="taskList">
                <h4>할 일</h4>
                {todos
                    .filter(todo => !todo.isdone)
                    .map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                }
            </ul>

            <ul className="doneList">
                <h4>완료</h4>
                {todos
                    .filter(todo => todo.isdone)
                    .map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                }
            </ul>
        </article>
    )
}

export default TodoList;