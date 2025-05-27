import Navbar from './components/Navbar';
import HomePage from './pages/Homepage'; 
import { BrowserRouter } from 'react-router-dom';
import ConfirmModal from './components/ConfirmModal';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <HomePage />
    </BrowserRouter>
  );
}

export default App;