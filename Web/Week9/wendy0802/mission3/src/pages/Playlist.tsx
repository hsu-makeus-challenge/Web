import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { increaseQuantity, decreaseQuantity, clearCart, calculateTotals } from '../redux/cart/cartSlice';
import { useEffect } from 'react';
import { openModal } from '../redux/modal/modalSlice';

interface ModalState {
  isOpen: boolean;
}

const Playlist = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart.items, dispatch]);

  return (
    <div className="w-full max-w-2xl flex flex-col gap-5 mt-8 mx-auto">
      {cart.items.map((item) => (
        <div
          key={item.id}
          className="flex items-center bg-white rounded-xl shadow-sm p-4"
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-16 h-16 rounded-lg object-cover mr-5"
          />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-lg text-gray-900 truncate whitespace-pre-wrap">{item.title}</div>
            <div className="text-sm text-gray-500 truncate">{item.singer || "가수 정보 없음"}</div>
            <div className="font-bold text-gray-900 mt-1">₩{item.price ? Number(item.price).toLocaleString() : "가격 정보 없음"}</div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              className="px-2 py-1 rounded-full border font-bold text-lg bg-gray-500"
              onClick={() => dispatch(decreaseQuantity(item.id))}
            >-</button>
            <button className="px-2 font-semibold text-lg bg-gray-100 rounded-full text-blue-400">{item.amount}</button>
            <button
              className="px-2 py-1 rounded-full border font-bold text-lg bg-gray-500"
              onClick={() => dispatch(increaseQuantity(item.id))}
            >+</button>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-2 border rounded-lg font-semibold bg-gray-500"
          onClick={() => dispatch(openModal())}
        >
          전체 삭제
        </button>
      </div>
    </div>
  );
};

export default Playlist;