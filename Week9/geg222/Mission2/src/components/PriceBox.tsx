import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(openModal());
  };
  return (
    <div className="p-12 flex flex-col gap-4">
      <div className="flex justify-center">
        <button
          onClick={handleClearCart}
          className="border p-4 rounded-md cursor-pointer"
        >
          전체 삭제
        </button>
      </div>
      <div className="flex justify-end">총 가격: {total} 원</div>
    </div>
  );
};

export default PriceBox;
