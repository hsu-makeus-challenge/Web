import { useCart } from '../context/Cart';

interface PlaylistItemProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
}

export default function PlaylistItem({ id, title, artist, price, image }: PlaylistItemProps) {
  const { cart, addToCart, removeFromCart } = useCart();
  const count = cart[id] || 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <img src={image} alt={title} style={{ width: 64, height: 64, borderRadius: 8, marginRight: 16 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div style={{ color: '#555', fontSize: 14 }}>{artist}</div>
        <div style={{ fontWeight: 'bold' }}>{`$${price}`}</div>
      </div>
      <div>
        <button onClick={() => removeFromCart(id)}>-</button>
        <span style={{ margin: '0 8px' }}>{count}</span>
        <button onClick={() => addToCart(id)}>+</button>
      </div>
    </div>
  );
}