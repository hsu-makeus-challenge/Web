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
              <ListTodo title="할 일" isDone={false} />
              <ListTodo title="완료" isDone={true} />
            </section>
        </main>
      </div>
    </div>
  )
}

export default App
