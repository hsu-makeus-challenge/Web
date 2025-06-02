import { useCartInfo } from '../hooks/useCartStore';
import { useModalStore } from '../hooks/useModalStore';

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalStore();

  const handleOpenCart = () => {
    openModal();
  };
  return (
    <div className="fixed bottom-0 w-full bg-gray-600 p-3 h-20 flex justify-between">
      <button
        onClick={handleOpenCart}
        className="border p-4 rounded-md cursor-pointer bg-pink-500 font-bold"
      >
        장바구니 초기화
      </button>
      <div className="bg-pink-500 border text-xl p-4 rounded-md ">
        총 가격 : {total}원
      </div>
    </div>
  );
};

export default PriceBox;
