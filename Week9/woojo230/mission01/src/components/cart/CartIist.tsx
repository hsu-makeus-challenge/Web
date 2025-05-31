import { useSelector, useDispatch } from 'react-redux';
import { resetCart } from '../../store/cart/cartSlice';
import { RootState } from '../../store/store';
import CartItem from './CartItem';

const CartList = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return (
      items
        .reduce((total, item) => {
          return total + parseInt(item.price) * item.amount;
        }, 0)
        .toLocaleString() + '원'
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">장바구니</h2>
      <div className="mb-6">
        {items.map((item) => (
          <CartItem key={item.id} data={item} />
        ))}
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <div>
          <p>
            총 결제 금액: <span className="font-bold">{getTotalPrice()}</span>
          </p>
        </div>
        <button
          className="bg-lime-500 text-white px-3 py-2 rounded-md cursor-pointer"
          onClick={() => dispatch(resetCart())}
        >
          장바구니 초기화
        </button>
      </div>
    </div>
  );
};

export default CartList;
