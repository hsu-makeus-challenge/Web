import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Header from './components/Header';
import CartList from './components/cart/CartIist';
import DeleteBtn from './components/DeleteBtn';
import DeleteModal from './components/modal/DeleteModal';

function App() {
  const { isOpen } = useSelector((state: RootState) => state.modal);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-300 p-4 flex-1 flex flex-col w-full">
        {isOpen && <DeleteModal />}
        <CartList />
        <div className="flex justify-center items-center m-4">
          <DeleteBtn />
        </div>
      </div>
    </div>
  );
}

export default App;
