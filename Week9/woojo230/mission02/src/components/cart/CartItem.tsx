import useCartStore from '../../store/cart/cartStore';
interface CartItemProps {
  data: {
    id: string;
    title: string;
    singer: string;
    price: string;
    img: string;
    amount: number;
  };
}

const CartItem = ({ data }: CartItemProps) => {
  const items = useCartStore((state) => state.items);
  const handleIncrement = useCartStore((state) => state.action.handleIncrement);
  const handleDecrement = useCartStore((state) => state.action.handleDecrement);
  const item = items.find((item) => item.id === data.id);
  const amount = item ? item.amount : 0;

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md w-full gap-4 mb-4">
      <div className="flex items-center gap-4">
        <img src={data.img} alt={data.title} className="w-16 h-16" />
        <div>
          <h3>{data.title}</h3>
          <p>가수: {data.singer}</p>
          <p>가격: {data.price}원</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="bg-gray-300 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => handleDecrement(data.id)}
          disabled={amount <= 0}
        >
          -
        </button>
        <p className="w-6 text-center">{amount}</p>
        <button
          className="bg-gray-300 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => handleIncrement(data.id)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
