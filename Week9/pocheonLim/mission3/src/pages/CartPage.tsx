import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { useModalStore } from '../store/useModalStore';

const CartPage = () => {
  const {
    items,
    totalAmount,
    totalPrice,
    increaseAmount,
    decreaseAmount,
    clearCart,
    calculateTotals,
  } = useCartStore();
  const { isOpen, openModal, closeModal } = useModalStore();

  React.useEffect(() => {
    calculateTotals();
  }, [items, calculateTotals]);

  const handleDecrease = (id: string) => {
    decreaseAmount(id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">장바구니</h1>
        {items.length > 0 && (
          <button
            onClick={openModal}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            전체 삭제
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-2">{item.singer}</p>
            <p className="text-lg font-bold mb-4">{Number(item.price).toLocaleString()}원</p>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.amount}</span>
                <button
                  onClick={() => increaseAmount(item.id)}
                  className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">총 수량:</span>
            <span className="text-xl font-bold">{totalAmount}개</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">총 금액:</span>
            <span className="text-2xl font-bold">{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      )}
      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">장바구니가 비어있습니다.</p>
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 min-w-[300px] text-center">
            <p className="mb-6 text-lg font-semibold">정말 삭제하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                아니요
              </button>
              <button
                onClick={() => {
                  clearCart();
                  closeModal();
                }}
                className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 