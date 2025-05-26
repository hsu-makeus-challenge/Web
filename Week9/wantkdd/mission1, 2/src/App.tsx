import './App.css';
import { Provider } from 'react-redux';
import CartList from './components/CartList';
import Navbar from './components/Navbar';
import store from './store/store';
import PriceBox from './components/PriceBox';
import DeleteModal from './components/DeleteModal';
import { useSelector } from './hooks/useCustomRedux';

function AppContent() {
  const { isOpen } = useSelector((state) => state.modal);

  return (
    <>
      <Navbar />
      <CartList />
      <PriceBox />
      {isOpen && <DeleteModal />}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
