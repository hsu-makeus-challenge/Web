import Navbar from './components/Navbar';
import HomePage from './pages/Homepage'; 
import { CartProvider } from './context/Cart';
import { BrowserRouter } from 'react-router-dom';
import ConfirmModal from './components/ConfirmModal';

function App() {
  return (
    <BrowserRouter>
        <CartProvider>
         <Navbar />
         <HomePage />
         <ConfirmModal />
        </CartProvider>
    </BrowserRouter>
  );
}

export default App;