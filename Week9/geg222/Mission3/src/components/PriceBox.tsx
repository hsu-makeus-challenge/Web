import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModalStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalActions();

  const handleClearCart = () => {
    openModal();
  };
  return (
    <div className="p-5 rounded-xl w-full max-w-xl mx-auto">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleClearCart}
          className="px-5 py-2 bg-[#3182f6] text-white rounded-md hover:bg-[#1d72e8] transition"
        >
          전체 삭제
        </button>
      </div>
      <div className="text-right text-base font-medium text-gray-700">
        총 가격: {total} 원
      </div>
    </div>
  );
};

export default PriceBox;
