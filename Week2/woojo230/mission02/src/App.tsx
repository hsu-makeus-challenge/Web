import { DarkModeProvider } from './contexts/darkModeContext';
import Content from './pages/content';

function App() {
  return (
    <DarkModeProvider>
      <Content />
    </DarkModeProvider>
  );
}

export default App;
