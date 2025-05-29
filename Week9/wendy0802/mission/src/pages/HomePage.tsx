import Navbar from '../components/Navbar';
import PlaylistItem from '../components/Playlistitem';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { openModal } from '../store/modalslice'; // 추가!
import ConfirmModal from '../components/ConfirmModal'; // 추가!

function HomePage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-20 flex flex-col items-center">
        <div className="w-full max-w-xl">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 font-bold py-16">장바구니가 비었습니다.</div>
          ) : (
            items.map(item => (
              <PlaylistItem key={item.id} item={item} />
            ))
          )}
          <div className="flex justify-center mt-8">
            <button
              className="w-full max-w-xs border border-gray-400 rounded py-2 font-bold bg-white hover:bg-gray-100 transition"
              onClick={() => dispatch(openModal('clearCart'))} // 여기!
            >
              전체 삭제
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal /> 
    </div>
  );
}

export default HomePage;