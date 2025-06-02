import './App.css';
import CartList from './components/CartList';
import Navbar from './components/Navbar';
import PriceBox from './components/PriceBox';
import DeleteModal from './components/DeleteModal';
import { useModalStore } from './hooks/useModalStore';

function App() {
  const { isOpen } = useModalStore();
  return (
    <>
      <Navbar />
      <div className="pb-20">
        <CartList />
      </div>
      <PriceBox />
      {isOpen && <DeleteModal />}
    </>
  );
}

export default App;
