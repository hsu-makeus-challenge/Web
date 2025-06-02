import type { JSX } from 'react';
import { useSelector, useDispatch } from '../hooks/useCustomRedux';
import type { RootState } from '../store/store';
import type { CartState } from '../slices/cartSlice';
import { clearCart } from '../slices/cartSlice';

const PriceBox = (): JSX.Element => {
  const { total } = useSelector((state: RootState): CartState => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = (): void => {
    dispatch(clearCart());
  };

  return (
    <div className='p-12 flex flex-col items-center'>
      <button className='border p-4 rounded-md cursor-pointer mb-4' onClick={handleInitializeCart}>
        전체 삭제
      </button>
      <div>총 가격: {total}원</div>
    </div>
  )
}

export default PriceBox