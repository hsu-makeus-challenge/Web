import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, calculateTotals } from '../redux/cartslice';
import CartItem from './cartitem';
import ConfirmationModal from './modal';
import type { RootState, AppDispatch } from '../redux/store';

const Cart: React.FC = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  const handleClearCart = () => setIsModalOpen(true);
  const confirmClearCart = () => {
    dispatch(clearCart());
    setIsModalOpen(false);
  };
  const cancelClearCart = () => setIsModalOpen(false);

  return (
    <div className="p-5">
      <h1 className="text-2xl">장바구니</h1>
      <div className="my-5">
        {cartItems.length > 0 ? (
          cartItems.map(item => <CartItem key={item.id} {...item} />)
        ) : (
          <p className="text-lg text-gray-500">장바구니가 비어 있습니다.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-left">
            <p>총 상품 수량: {totalQuantity}</p>
            <p>총 금액: ₩{totalAmount}</p>
          </div>
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white py-2.5 px-5 rounded cursor-pointer"
          >
            장바구니 초기화
          </button>
        </div>
      )}
      {isModalOpen && (
        <ConfirmationModal
          message="장바구니를 초기화 하시겠습니까?"
          onConfirm={confirmClearCart}
          onCancel={cancelClearCart}
        />
      )}
    </div>
  );
};

export default Cart;
