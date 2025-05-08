import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LpDataType } from '../../type/type';
import { FaHeart } from "react-icons/fa6";

interface LpItemProps {
  title: string | undefined;
  id: number | undefined;
  thumbnail: string | undefined;
  createdAt: number | undefined;
  likes: LpDataType['likes'] | undefined;
}

const LpItem = ({ id: lpId, title, thumbnail, createdAt, likes }: LpItemProps) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const gotoLpDetailPage = (lpId: number) => {
    if (!lpId) return;
    navigate(`/lp/${lpId}`);
  };

  return (
    <div
      className="relative aspect-square rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => gotoLpDetailPage(lpId!)}
    >
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      {isHover && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300">
          <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-200 text-sm">
            {new Date(createdAt!).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <div className="flex items-center gap-1 text-gray-200 text-sm">
            <FaHeart className="text-red-500" />
            <span>{likes?.length ?? 0}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LpItem;
