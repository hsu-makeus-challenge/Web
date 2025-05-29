import React from 'react';
import { useDispatch } from 'react-redux';
import { increase, decrease, removeItem } from '../store/cartslice';
import type { CartItem } from '../store/cartslice';

interface PlaylistItemProps {
  item: CartItem;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center bg-white rounded-xl shadow p-4 mb-6 max-w-xl w-full mx-auto">
                <img
          src={item.img}
          alt={item.title}
          style={{ width: '64px', height: '64px', objectFit: 'cover' }}
          className="rounded-lg mr-4"
/>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-lg truncate">{item.title}</div>
        <div className="text-gray-500 text-sm truncate">{item.singer}</div>
        <div className="font-bold text-base mt-1">₩{Number(item.price).toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button
          className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-gray-300"
          onClick={() => dispatch(decrease(item.id))}
        >
          -
        </button>
        <span className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-blue-900">
          {item.amount}
        </span>
        <button
          className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-gray-300"
          onClick={() => dispatch(increase(item.id))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PlaylistItem;