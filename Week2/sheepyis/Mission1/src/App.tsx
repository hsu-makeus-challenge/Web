import './App.css'
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ListTodo from './components/TodoList/list-todo';

function App() {
  return (
    <div className="AppContainer">
      <div className="TodoContainer">
        <Header />
        <main>
            <Form />

            <section id="listContainer">
              <ListTodo title="할 일" funcName="완료" />
              <ListTodo title="완료" funcName="삭제" />
            </section>
        </main>
      </div>
    </div>
  )
}

export default App
