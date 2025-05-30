import './App.css';
import { Provider } from 'react-redux';
import CartList from './components/CartList';
import Navbar from './components/Navbar';
import { store, persistor } from './store/store';
import PriceBox from './components/PriceBox';
import DeleteModal from './components/DeleteModal';
import { useSelector } from './hooks/useCustomRedux';
import { PersistGate } from 'redux-persist/integration/react';

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
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
