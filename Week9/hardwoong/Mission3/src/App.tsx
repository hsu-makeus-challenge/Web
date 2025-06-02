import Navbar from './components/Navbar';
import CartList from './components/CartList';
import PriceBox from './components/PriceBox';
import Modal from './components/Modal';
import DeleteButton from './components/DeleteButton';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Navbar />
      <CartList />
      <div className="flex justify-center items-center mt-4">
        <DeleteButton />
      </div>
      <PriceBox />
      <Modal />
      <ToastContainer />
    </>
  )
}

export default App
