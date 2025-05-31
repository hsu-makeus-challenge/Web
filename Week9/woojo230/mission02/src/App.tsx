import useModalStore from './store/modal/modalCart';
import Header from './components/Header';
import CartList from './components/cart/CartIist';
import DeleteBtn from './components/DeleteBtn';
import DeleteModal from './components/modal/DeleteModal';

function App() {
  const isModalOpen = useModalStore((state) => state.isModalOpen);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-300 p-4 flex-1 flex flex-col w-full">
        {isModalOpen && <DeleteModal />}
        <CartList />
        <div className="flex justify-center items-center m-4">
          <DeleteBtn />
        </div>
      </div>
    </div>
  );
}

export default App;
