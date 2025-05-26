import type { JSX } from 'react';
import { useSelector, useDispatch } from '../hooks/useCustomRedux';
import type { RootState } from '../store/store';
import type { CartState } from '../slices/cartSlice';
import { openModal } from '../slices/modalSlice';

const PriceBox = (): JSX.Element => {
  const { total } = useSelector((state: RootState): CartState => state.cart);
  const dispatch = useDispatch();

  const handleOpenModal = (): void => {
    dispatch(openModal());
  };

  return (
    <div className='p-12 flex flex-col items-center'>
      <button className='border p-4 rounded-md cursor-pointer mb-4' onClick={handleOpenModal}>
        전체 삭제
      </button>
      <div>총 가격: {total}원</div>
    </div>
  )
}

export default PriceBox