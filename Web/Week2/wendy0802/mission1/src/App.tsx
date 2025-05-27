import { JSX } from "react";
import "./App.css";
import Todo from "./component/Todo";
import { TodoProvider } from "./component/context/TodoContext";

console.log("App.tsx 실행 중");

function App(): JSX.Element {
  console.log("✅ App.tsx 실행됨");
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  );
}

export default App;
