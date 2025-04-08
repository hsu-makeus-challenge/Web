import Global from './styles/Global';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoForm';

function App() {
  return (
    <>
      <Global />
      <Wrapper>
        <main id='Todo'>
          <h3>YONG TODO</h3>
          <TodoInput />
          <TodoList />
        </main>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
background-color: gainsboro;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    
`

export default App;
