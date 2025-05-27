import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useDispatch } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
  const { clearCart } = useCartActions();
  const { total } = useCartInfo();
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    clearCart();
  };

  const handleAllDelete = () => {
    dispatch(openModal());
  };
  return (
    <div className="p-12 flex justify-end gap-4 shadow-md rounded-md">
      <div className="flex gap-4">
        <button
          className="border p-4 rounded-md cursor-pointer bg-red-600 text-white font-medium shadow"
          onClick={handleAllDelete}
        >
          전체 삭제
        </button>
        <button
          className="border p-4 rounded-md cursor-pointer bg-red-600 text-white font-medium shadow"
          onClick={handleInitializeCart}
        >
          장바구니 초기화
        </button>
      </div>
      <div className="p-8 bg-white shadow-md rounded-md">
        <span className="text-red-500">총 가격 : {total}원</span>
      </div>
    </div>
  );
};

export default PriceBox;
