import type { JSX } from 'react';
import { useCartInfo } from '../hooks/useCartStore';

const PriceBox = (): JSX.Element => {
  const { total } = useCartInfo();

  return (
    <div className='p-12 flex flex-col items-end'>
      <div>총 가격: {total}원</div>
    </div>
  )
}

export default PriceBox;